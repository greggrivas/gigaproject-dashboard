export type AppScreen = "dashboard" | "map" | "cameras";

type SideNavigationProps = {
  open: boolean;
  activeScreen: AppScreen;
  onSelectScreen: (screen: AppScreen) => void;
};

export function SideNavigation({
  open,
  activeScreen,
  onSelectScreen,
}: SideNavigationProps) {
  if (!open) {
    return null;
  }

  return (
    <aside className="dashboard-sidebar">
      <button
        type="button"
        className={activeScreen === "dashboard" ? "sidebar-item active" : "sidebar-item"}
        onClick={() => onSelectScreen("dashboard")}
      >
        Dashboard
      </button>
      <button
        type="button"
        className={activeScreen === "map" ? "sidebar-item active" : "sidebar-item"}
        onClick={() => onSelectScreen("map")}
      >
        Map
      </button>
      <button
        type="button"
        className={activeScreen === "cameras" ? "sidebar-item active" : "sidebar-item"}
        onClick={() => onSelectScreen("cameras")}
      >
        Cameras
      </button>
    </aside>
  );
}
