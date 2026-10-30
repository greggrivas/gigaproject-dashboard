import { ObcButton } from "@oicl/openbridge-webcomponents-react/components/button/button";
import { ObcProgressBar } from "@oicl/openbridge-webcomponents-react/components/progress-bar/progress-bar";
import { ObcSlider } from "@oicl/openbridge-webcomponents-react/components/slider/slider";
import { ObcAzimuthThruster } from "@oicl/openbridge-webcomponents-react/navigation-instruments/azimuth-thruster/azimuth-thruster";
import { ObcCompass } from "@oicl/openbridge-webcomponents-react/navigation-instruments/compass/compass";
import { ObcGaugeRadial } from "@oicl/openbridge-webcomponents-react/navigation-instruments/gauge-radial/gauge-radial";
import { ObcPitchRoll } from "@oicl/openbridge-webcomponents-react/navigation-instruments/pitch-roll/pitch-roll";
import { ObcReadoutListItem } from "@oicl/openbridge-webcomponents-react/navigation-instruments/readout-list-item/readout-list-item";
import { ObcReadoutList } from "@oicl/openbridge-webcomponents-react/navigation-instruments/readout-list/readout-list";
import { ObcReadout } from "@oicl/openbridge-webcomponents-react/navigation-instruments/readout/readout";
import { ObcSliderVariant } from "@oicl/openbridge-webcomponents/dist/components/slider/slider.js";
import { ObcGaugeRadialType } from "@oicl/openbridge-webcomponents/dist/navigation-instruments/gauge-radial/gauge-radial.js";
import {
  ReadoutAlignment,
  ReadoutSize,
  ReadoutStacking,
  ReadoutValueType,
} from "@oicl/openbridge-webcomponents/dist/navigation-instruments/readout/readout.js";
import { mission, vessel } from "../data/vessel";
import type {
  ThrusterState,
  VesselDispatch,
  VesselState,
} from "../hooks/useVesselControl";
import { CommandBar } from "../ui/CommandBar";
import { Panel } from "../ui/Panel";

type ThrusterPanelProps = {
  thruster: ThrusterState;
  index: number;
  enabled: boolean;
  dispatch: VesselDispatch;
};

function ThrusterPanel({ thruster, index, enabled, dispatch }: ThrusterPanelProps) {
  return (
    <Panel title={thruster.name}>
      <div className="instrument">
        <ObcAzimuthThruster
          angle={thruster.angle}
          thrust={thruster.thrust}
          angleSetpoint={thruster.angleSetpoint ?? undefined}
          thrustSetpoint={thruster.thrustSetpoint ?? undefined}
          autoAtAngleSetpoint
          autoAtThrustSetpoint
        />
      </div>
      <div className="control-grid">
        <ObcReadout
          label="Azimuth"
          value={thruster.angle}
          hasDegree
          maxDigits={3}
          valueOptions={{ hintedZeros: true }}
          size={ReadoutSize.small}
          stacking={ReadoutStacking.stacked}
          alignment={ReadoutAlignment.center}
        />
        <ObcSlider
          variant={ObcSliderVariant.Normal}
          min={0}
          max={360}
          step={1}
          value={thruster.angleSetpoint ?? thruster.angle}
          disabled={!enabled}
          onValue={(event) =>
            dispatch({ type: "setThruster", index, angle: event.detail })
          }
        />
        <ObcReadout
          label="Thrust"
          unit="%"
          value={thruster.thrust}
          maxDigits={3}
          size={ReadoutSize.small}
          stacking={ReadoutStacking.stacked}
          alignment={ReadoutAlignment.center}
        />
        <ObcSlider
          variant={ObcSliderVariant.Normal}
          min={0}
          max={100}
          step={1}
          value={thruster.thrustSetpoint ?? thruster.thrust}
          disabled={!enabled}
          onValue={(event) =>
            dispatch({ type: "setThruster", index, thrust: event.detail })
          }
        />
      </div>
    </Panel>
  );
}

type DashboardScreenProps = {
  state: VesselState;
  dispatch: VesselDispatch;
};

export function DashboardScreen({ state, dispatch }: DashboardScreenProps) {
  const [portThruster, starboardThruster] = state.thrusters;
  const speedOverGround = Math.abs(state.speed);
  const courseOverGround = (state.heading + vessel.leeway) % 360;
  const headingEnabled = state.mode === "heading";
  const manualEnabled = state.mode === "manual";

  return (
    <section className="console">
      <CommandBar mode={state.mode} dispatch={dispatch} />

      <ThrusterPanel
        thruster={portThruster}
        index={0}
        enabled={manualEnabled}
        dispatch={dispatch}
      />

      <Panel title="Navigation" className="console-nav">
        <div className="instrument">
          <ObcCompass
            heading={state.heading}
            courseOverGround={courseOverGround}
            headingSetpoint={state.headingSetpoint}
            autoAtHeadingSetpoint
          />
        </div>
        <div className="control-grid control-grid-nav">
          <ObcReadout
            label="HDG"
            value={state.heading}
            hasDegree
            maxDigits={3}
            valueOptions={{ hintedZeros: true }}
            size={ReadoutSize.medium}
            stacking={ReadoutStacking.stacked}
            alignment={ReadoutAlignment.center}
          />
          <ObcSlider
            variant={ObcSliderVariant.Normal}
            min={0}
            max={360}
            step={1}
            value={state.headingSetpoint ?? state.heading}
            disabled={!headingEnabled}
            onValue={(event) =>
              dispatch({ type: "setHeading", heading: event.detail })
            }
          />
          <div className="heading-steps">
            <ObcButton
              disabled={!headingEnabled}
              onClick={() =>
                dispatch({
                  type: "setHeading",
                  heading: (state.headingSetpoint ?? state.heading) - 10,
                })
              }
            >
              -10°
            </ObcButton>
            <ObcButton
              disabled={!headingEnabled}
              onClick={() =>
                dispatch({
                  type: "setHeading",
                  heading: (state.headingSetpoint ?? state.heading) + 10,
                })
              }
            >
              +10°
            </ObcButton>
          </div>
          <ObcReadout
            label="SOG"
            unit="kn"
            value={speedOverGround}
            fractionDigits={1}
            size={ReadoutSize.medium}
            stacking={ReadoutStacking.stacked}
            alignment={ReadoutAlignment.center}
          />
          <ObcSlider
            variant={ObcSliderVariant.Normal}
            min={0}
            max={vessel.maxSpeed}
            step={0.5}
            value={state.speedSetpoint ?? speedOverGround}
            disabled={!headingEnabled}
            onValue={(event) => dispatch({ type: "setSpeed", speed: event.detail })}
          />
          <ObcReadout
            label="COG"
            value={courseOverGround}
            hasDegree
            maxDigits={3}
            valueOptions={{ hintedZeros: true }}
            size={ReadoutSize.medium}
            stacking={ReadoutStacking.stacked}
            alignment={ReadoutAlignment.center}
          />
        </div>
      </Panel>

      <ThrusterPanel
        thruster={starboardThruster}
        index={1}
        enabled={manualEnabled}
        dispatch={dispatch}
      />

      <div className="console-strip">
        <Panel title="Speed Over Ground">
          <div className="instrument">
            <ObcGaugeRadial
              value={speedOverGround}
              maxValue={vessel.maxSpeed}
              minValue={0}
              type={ObcGaugeRadialType.needle}
              setpoint={state.speedSetpoint ?? undefined}
              hasReadout
              label="SOG"
              unit="kn"
              fractionDigits={1}
            />
          </div>
        </Panel>

        <Panel title="Motion" bodyClassName="motion-body">
          <div className="instrument">
            <ObcPitchRoll pitch={vessel.pitch} roll={vessel.roll} />
          </div>
          <div className="motion-readouts">
            <ObcReadout label="Pitch" value={vessel.pitch} hasDegree size={ReadoutSize.small} />
            <ObcReadout label="Roll" value={vessel.roll} hasDegree size={ReadoutSize.small} />
            <ObcReadout label="Yaw" value={vessel.yaw} hasDegree size={ReadoutSize.small} />
            <ObcReadout
              label="Waves"
              unit="m"
              value={vessel.waveHeight}
              fractionDigits={1}
              size={ReadoutSize.small}
            />
          </div>
        </Panel>

        <Panel title="Power">
          <div className="battery-list">
            {vessel.batteries.map((battery) => (
              <div key={battery.name}>
                <div className="battery-label">{battery.name}</div>
                <ObcProgressBar value={battery.level} showValue />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Mission">
          <ObcReadoutList>
            <ObcReadoutListItem
              label="Mission"
              value={mission.name}
              valueType={ReadoutValueType.text}
            />
            <ObcReadoutListItem
              label="Action"
              value={mission.activeAction}
              valueType={ReadoutValueType.text}
            />
            <ObcReadoutListItem
              label="USV"
              value={mission.activeUsv}
              valueType={ReadoutValueType.text}
            />
            <ObcReadoutListItem
              label="LAT"
              value={vessel.latitude}
              valueType={ReadoutValueType.text}
            />
            <ObcReadoutListItem
              label="LON"
              value={vessel.longitude}
              valueType={ReadoutValueType.text}
            />
          </ObcReadoutList>
        </Panel>
      </div>
    </section>
  );
}
