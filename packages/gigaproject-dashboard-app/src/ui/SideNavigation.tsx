import { ObcNavigationItem } from "@oicl/openbridge-webcomponents-react/components/navigation-item/navigation-item";
import { ObcNavigationMenu } from "@oicl/openbridge-webcomponents-react/components/navigation-menu/navigation-menu";
import { ObiCamera } from "@oicl/openbridge-webcomponents-react/icons/icon-camera";
import { ObiChartGridIec } from "@oicl/openbridge-webcomponents-react/icons/icon-chart-grid-iec";
import { ObiConningIec } from "@oicl/openbridge-webcomponents-react/icons/icon-conning-iec";
import { ObcNavigationMenuVariant } from "@oicl/openbridge-webcomponents/dist/components/navigation-menu/navigation-menu.js";

export type AppScreen = "dashboard" | "map" | "cameras";

type SideNavigationProps = {
  open: boolean;
  activeScreen: AppScreen;
  onSelectScreen: (screen: AppScreen) => void;
};

const items = [
  { screen: "dashboard", label: "Dashboard", Icon: ObiConningIec },
  { screen: "map", label: "Map", Icon: ObiChartGridIec },
  { screen: "cameras", label: "Cameras", Icon: ObiCamera },
] as const;

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
      <ObcNavigationMenu variant={ObcNavigationMenuVariant.Compact}>
        {items.map(({ screen, label, Icon }) => (
          <ObcNavigationItem
            key={screen}
            slot="main"
            label={label}
            hasIcon
            checked={activeScreen === screen}
            onClick={() => onSelectScreen(screen)}
          >
            <Icon slot="icon" />
          </ObcNavigationItem>
        ))}
      </ObcNavigationMenu>
    </aside>
  );
}
