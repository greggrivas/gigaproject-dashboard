import { useState } from "react";
import { activeAlerts } from "./data/vessel";
import { useVesselControl } from "./hooks/useVesselControl";
import { CamerasScreen } from "./screens/CamerasScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { MapScreen } from "./screens/MapScreen";
import { BrillianceMenu } from "./ui/BrillianceMenu";
import { AppScreen, SideNavigation } from "./ui/SideNavigation";
import { TopBar } from "./ui/TopBar";

const pageNames: Record<AppScreen, string> = {
  dashboard: "Autonomous Vessel Dashboard",
  map: "Map & Waypoints",
  cameras: "Camera Feeds",
};

function App() {
  const [showNav, setShowNav] = useState(true);
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppScreen>("dashboard");
  const { state: vesselState, dispatch } = useVesselControl();

  return (
    <>
      <header>
        <TopBar
          appTitle="GigaProject"
          pageName={pageNames[activeScreen]}
          alertCount={activeAlerts.length}
          onAlertClicked={() => setActiveScreen("map")}
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
          <DashboardScreen state={vesselState} dispatch={dispatch} />
        ) : null}
        {activeScreen === "map" ? <MapScreen /> : null}
        {activeScreen === "cameras" ? <CamerasScreen /> : null}
      </main>
    </>
  );
}

export default App;
