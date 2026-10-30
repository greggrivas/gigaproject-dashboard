import { ObcAlertButton } from "@oicl/openbridge-webcomponents-react/components/alert-button/alert-button";
import { ObcClock } from "@oicl/openbridge-webcomponents-react/components/clock/clock";
import { ObcTopBar } from "@oicl/openbridge-webcomponents-react/components/top-bar/top-bar";
import { AlertType } from "@oicl/openbridge-webcomponents/dist/types.js";
import { useMinuteUpdate } from "../hooks/useMinuteUpdate";

type TopBarProps = {
  appTitle: string;
  pageName: string;
  alertCount: number;
  menuButtonActivated: boolean;
  dimmingButtonActivated: boolean;
  onAlertClicked: () => void;
  onMenuButtonClicked: () => void;
  onDimmingButtonClicked: () => void;
};

export function TopBar({
  appTitle,
  pageName,
  alertCount,
  menuButtonActivated,
  dimmingButtonActivated,
  onAlertClicked,
  onMenuButtonClicked,
  onDimmingButtonClicked,
}: TopBarProps) {
  const date = useMinuteUpdate();

  return (
    <ObcTopBar
      appTitle={appTitle}
      pageName={pageName}
      menuButtonActivated={menuButtonActivated}
      showClock
      showDimmingButton
      dimmingButtonActivated={dimmingButtonActivated}
      onMenuButtonClicked={onMenuButtonClicked}
      onDimmingButtonClicked={onDimmingButtonClicked}
    >
      <ObcAlertButton
        slot="alerts"
        nAlerts={alertCount}
        alertType={AlertType.Warning}
        onClickAlert={onAlertClicked}
      />
      <ObcClock slot="clock" date={date} />
    </ObcTopBar>
  );
}
