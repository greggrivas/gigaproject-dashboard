// Mock telemetry shown on the dashboard until a live data source is connected.
export const vessel = {
  leeway: 3,
  maxSpeed: 25,
  pitch: 5,
  roll: 0,
  yaw: 0,
  waveHeight: 2.3,
  latitude: "62.4722 N",
  longitude: "6.1549 E",
  thrusterNames: ["Port Thruster", "Starboard Thruster"],
  batteries: [
    { name: "Battery 1", level: 80 },
    { name: "Battery 2", level: 66 },
  ],
};

export const mission = {
  name: "Indre fjord depth survey",
  heading: 39,
  speed: 11.8,
  activeUsv: "1 Bylibob",
  activeAction: "Action 7 - Transit corridor",
};

export const missionActions = [
  "Action 7 - Transit corridor",
  "Action 8 - Waypoint gate",
  "Action 9 - Hold point",
];

export const usvFleet = ["1 Bylibob", "2 Heyerdahl", "3 Nelle", "4 Marie Tharp"];

export const activeAlerts = ["USV 3: Other ship crossing path"];

export const cameraFeeds = [
  { title: "Live Camera - Bow", placeholder: "Panoramic feed placeholder" },
  { title: "Live Camera - Stern", placeholder: "Stern feed placeholder" },
  { title: "ROV Camera", placeholder: "ROV feed placeholder" },
];
