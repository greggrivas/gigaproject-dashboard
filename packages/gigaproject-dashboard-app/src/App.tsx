import { useState } from "react";
import { TopBar } from "./ui/TopBar";
import { BrillianceMenu } from "./ui/BrillianceMenu";
import { AppScreen, SideNavigation } from "./ui/SideNavigation";
import "./ui/openbridge-elements";
import "./index.css";

function App() {
  const [showNav, setShowNav] = useState(true);
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppScreen>("dashboard");

  const pageName =
    activeScreen === "dashboard"
      ? "Autonomous Vessel Dashboard"
      : activeScreen === "map"
        ? "Map & Waypoints"
        : "Camera Feeds";

  return (
    <>
      <header>
        <TopBar
          appTitle="GigaProject"
          pageName={pageName}
          menuButtonActivated={showNav}
          dimmingButtonActivated={showBrillianceMenu}
          onMenuButtonClicked={() => setShowNav((current) => !current)}
          onDimmingButtonClicked={() =>
            setShowBrillianceMenu((current) => !current)
          }
        />
      </header>
      <main className={showNav ? "main nav-open" : "main"}>
        <SideNavigation
          open={showNav}
          activeScreen={activeScreen}
          onSelectScreen={setActiveScreen}
        />
        {showBrillianceMenu ? (
          <BrillianceMenu className="brilliance-menu" />
        ) : null}
        {activeScreen === "dashboard" ? (
          <section className="dashboard-shell">
            <section className="dashboard-top">
              <section className="panel tile tile-thruster">
                <h4>Port Thruster</h4>
                <obc-azimuth-thruster angle={218} thrust={61}></obc-azimuth-thruster>
                <div className="thruster-readouts">
                  <div className="readout-row">
                    <div className="readout-meta">
                      <span>Azimuth</span>
                      <strong>218°</strong>
                    </div>
                    <obc-slider className="readout-slider" variant="no-input" min={0} max={360} value={218}></obc-slider>
                  </div>
                  <div className="readout-row">
                    <div className="readout-meta">
                      <span>Power</span>
                      <strong>61%</strong>
                    </div>
                    <obc-slider className="readout-slider" variant="no-input" min={0} max={100} value={61}></obc-slider>
                  </div>
                </div>
              </section>

              <div className="nav-column">
                <section className="panel tile tile-compass">
                  <h4>Navigation</h4>
                  <div className="nav-core-layout">
                    <obc-compass
                      heading={39}
                      courseoverground={42}
                    ></obc-compass>
                  </div>
                </section>
                <section className="panel tile tile-nav-stats">
                  <h4>Navigation Data</h4>
                  <div className="nav-core-stats">
                    <div>
                      <div className="metric-label">Heading</div>
                      <div className="metric-value nav-primary">039°</div>
                    </div>
                    <div>
                      <div className="metric-label">Speed</div>
                      <div className="metric-value nav-primary">11.8 kn</div>
                    </div>
                    <div>
                      <div className="metric-label">COG</div>
                      <div className="metric-value nav-primary">042°</div>
                    </div>
                  </div>
                </section>
              </div>

              <section className="panel tile tile-thruster">
                <h4>Starboard Thruster</h4>
                <obc-azimuth-thruster angle={145} thrust={54}></obc-azimuth-thruster>
                <div className="thruster-readouts">
                  <div className="readout-row">
                    <div className="readout-meta">
                      <span>Azimuth</span>
                      <strong>145°</strong>
                    </div>
                    <obc-slider className="readout-slider" variant="no-input" min={0} max={360} value={145}></obc-slider>
                  </div>
                  <div className="readout-row">
                    <div className="readout-meta">
                      <span>Power</span>
                      <strong>54%</strong>
                    </div>
                    <obc-slider className="readout-slider" variant="no-input" min={0} max={100} value={54}></obc-slider>
                  </div>
                </div>
              </section>
            </section>

            <section className="dashboard-lower">
              <section className="panel tile tile-speed">
                <h4>Speed Over Ground</h4>
                <div className="sog-center">
                  <obc-gauge-radial value={11.8} maxvalue={25} minvalue={0} type="needle"></obc-gauge-radial>
                </div>
                <div className="sog-readout">
                  <div className="metric-value">11.8</div>
                  <div className="metric-label">STW</div>
                  <div className="metric-label">KN</div>
                </div>
              </section>

              <section className="panel tile tile-sensors">
                <h4>Pitch & Yaw</h4>
                <div className="pitchyaw-layout">
                  <div className="pitchyaw-stats">
                    <div>
                      <div className="metric-label">Pitch</div>
                      <div className="metric-value large">5°</div>
                    </div>
                    <div>
                      <div className="metric-label">Yaw</div>
                      <div className="metric-value large">0°</div>
                    </div>
                    <div>
                      <div className="metric-label">Waves</div>
                      <div className="metric-value large">2.3 m</div>
                    </div>
                  </div>
                  <obc-pitch-roll pitch={5} roll={0}></obc-pitch-roll>
                </div>
              </section>

              <section className="panel tile tile-telemetry">
                <h4>Telemetry</h4>
                <div className="telemetry-grid">
                  <div>
                    <div className="metric-label">GNSS Position</div>
                    <div className="metric-value">62.4722 N, 6.1549 E</div>
                  </div>
                  <div>
                    <div className="metric-label">Heading / COG</div>
                    <div className="metric-value">039° / 042°</div>
                  </div>
                  <div>
                    <div className="metric-label">Battery 1</div>
                    <obc-progress-bar value={80} showvalue></obc-progress-bar>
                  </div>
                  <div>
                    <div className="metric-label">Battery 2</div>
                    <obc-progress-bar value={66} showvalue></obc-progress-bar>
                  </div>
                </div>
              </section>
            </section>
          </section>
        ) : null}
        {activeScreen === "map" ? (
          <section className="map-shell">
            <aside className="map-sidepanel">
              <div className="panel-title">Mission Control</div>
              <div className="mission-block">
                <div className="muted">Selected Mission</div>
                <strong>Indre fjord depth survey</strong>
              </div>
              <div className="mission-list">
                <div className="row active">Action 7 - Transit corridor</div>
                <div className="row">Action 8 - Waypoint gate</div>
                <div className="row">Action 9 - Hold point</div>
              </div>
              <div className="panel-title">USV List</div>
              <div className="mission-list">
                <div className="row active">1 Bylibob</div>
                <div className="row">2 Heyerdahl</div>
                <div className="row">3 Nelle</div>
                <div className="row">4 Marie Tharp</div>
              </div>
            </aside>

            <section className="map-workspace">
              <div className="map-alertbar">
                <span>USV 3: Other ship crossing path</span>
                <button type="button">Ack</button>
                <button type="button">Go to</button>
              </div>
              <div className="map-canvas">
                <div className="map-overlay">OpenCPN Strategic Map Placeholder</div>
                <div className="map-tools">
                  <button type="button">+</button>
                  <button type="button">-</button>
                  <button type="button">Layers</button>
                  <button type="button">Track</button>
                </div>
              </div>
            </section>
          </section>
        ) : null}
        {activeScreen === "cameras" ? (
          <section className="single-screen camera-screen">
            <section className="panel">
              <h4>Live Camera - Bow</h4>
              <div className="placeholder-panel large">Panoramic feed placeholder</div>
            </section>
            <section className="panel">
              <h4>Live Camera - Stern</h4>
              <div className="placeholder-panel large">Stern feed placeholder</div>
            </section>
            <section className="panel">
              <h4>ROV Camera</h4>
              <div className="placeholder-panel large">ROV feed placeholder</div>
            </section>
          </section>
        ) : null}
      </main>
    </>
  );
}

export default App;
