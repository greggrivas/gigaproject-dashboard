import { useEffect, useReducer } from "react";
import { mission, vessel } from "../data/vessel";

export type ControlMode = "mission" | "heading" | "manual";

export type ThrusterState = {
  name: string;
  angle: number;
  thrust: number;
  angleSetpoint: number | null;
  thrustSetpoint: number | null;
};

export type VesselState = {
  mode: ControlMode;
  heading: number;
  speed: number;
  headingSetpoint: number | null;
  speedSetpoint: number | null;
  thrusters: ThrusterState[];
};

type Action =
  | { type: "tick" }
  | { type: "setMode"; mode: ControlMode }
  | { type: "setHeading"; heading: number }
  | { type: "setSpeed"; speed: number }
  | { type: "setThruster"; index: number; angle?: number; thrust?: number }
  | { type: "stop" };

const TICK_SECONDS = 0.1;

const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;
const shortestDelta = (from: number, to: number) =>
  ((to - from + 540) % 360) - 180;
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const initialState: VesselState = {
  mode: "mission",
  heading: mission.heading,
  speed: mission.speed,
  headingSetpoint: mission.heading,
  speedSetpoint: mission.speed,
  thrusters: vessel.thrusterNames.map((name) => ({
    name,
    angle: 0,
    thrust: (mission.speed / vessel.maxSpeed) * 100,
    angleSetpoint: null,
    thrustSetpoint: null,
  })),
};

function tick(state: VesselState): VesselState {
  const { heading, headingSetpoint, speedSetpoint } = state;
  let autoAngle = 0;
  let autoThrust = 0;
  if (headingSetpoint !== null && speedSetpoint !== null) {
    const error = shortestDelta(heading, headingSetpoint);
    autoAngle = clamp(error * 1.5, -35, 35);
    autoThrust =
      ((speedSetpoint / vessel.maxSpeed) * 100) /
      Math.cos(toRadians(autoAngle));
    // Keeps enough thrust to finish a turn when the speed setpoint is low.
    if (Math.abs(error) > 2) autoThrust = Math.max(autoThrust, 15);
  }

  const thrusters = state.thrusters.map((thruster) => {
    const targetAngle = thruster.angleSetpoint ?? autoAngle;
    const targetThrust = thruster.thrustSetpoint ?? autoThrust;
    const angleStep = clamp(
      shortestDelta(thruster.angle, targetAngle),
      -30 * TICK_SECONDS,
      30 * TICK_SECONDS,
    );
    const thrustStep = clamp(
      targetThrust - thruster.thrust,
      -25 * TICK_SECONDS,
      25 * TICK_SECONDS,
    );
    return {
      ...thruster,
      angle: normalizeAngle(thruster.angle + angleStep),
      thrust: thruster.thrust + thrustStep,
    };
  });

  const average = (component: (radians: number) => number) =>
    thrusters.reduce(
      (sum, { angle, thrust }) => sum + (thrust / 100) * component(toRadians(angle)),
      0,
    ) / thrusters.length;
  const targetSpeed = average(Math.cos) * vessel.maxSpeed;
  const turnRate = average(Math.sin) * 12;

  return {
    ...state,
    thrusters,
    speed: state.speed + ((targetSpeed - state.speed) * TICK_SECONDS) / 4,
    heading: normalizeAngle(heading + turnRate * TICK_SECONDS),
  };
}

function setMode(state: VesselState, mode: ControlMode): VesselState {
  const clearedThrusters = state.thrusters.map((thruster) => ({
    ...thruster,
    angleSetpoint: null,
    thrustSetpoint: null,
  }));
  switch (mode) {
    case "mission":
      return {
        ...state,
        mode,
        headingSetpoint: mission.heading,
        speedSetpoint: mission.speed,
        thrusters: clearedThrusters,
      };
    // Heading and manual start from the vessel's current state, so switching
    // mode does not by itself change how the vessel is moving.
    case "heading":
      return {
        ...state,
        mode,
        headingSetpoint: Math.round(state.heading),
        speedSetpoint: Math.round(Math.abs(state.speed) * 2) / 2,
        thrusters: clearedThrusters,
      };
    case "manual":
      return {
        ...state,
        mode,
        headingSetpoint: null,
        speedSetpoint: null,
        thrusters: state.thrusters.map((thruster) => ({
          ...thruster,
          angleSetpoint: Math.round(thruster.angle),
          thrustSetpoint: Math.round(thruster.thrust),
        })),
      };
  }
}

function reducer(state: VesselState, action: Action): VesselState {
  switch (action.type) {
    case "tick":
      return tick(state);
    case "setMode":
      return setMode(state, action.mode);
    case "setHeading":
      return state.mode === "heading"
        ? { ...state, headingSetpoint: normalizeAngle(action.heading) }
        : state;
    case "setSpeed":
      return state.mode === "heading"
        ? { ...state, speedSetpoint: action.speed }
        : state;
    case "setThruster":
      if (state.mode !== "manual") return state;
      return {
        ...state,
        thrusters: state.thrusters.map((thruster, index) =>
          index === action.index
            ? {
                ...thruster,
                angleSetpoint: action.angle ?? thruster.angleSetpoint,
                thrustSetpoint: action.thrust ?? thruster.thrustSetpoint,
              }
            : thruster,
        ),
      };
    case "stop":
      return {
        ...setMode(state, "heading"),
        headingSetpoint: Math.round(state.heading),
        speedSetpoint: 0,
      };
  }
}

export function useVesselControl() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const intervalId = window.setInterval(
      () => dispatch({ type: "tick" }),
      TICK_SECONDS * 1000,
    );
    return () => window.clearInterval(intervalId);
  }, []);

  return { state, dispatch };
}

export type VesselDispatch = ReturnType<typeof useVesselControl>["dispatch"];
