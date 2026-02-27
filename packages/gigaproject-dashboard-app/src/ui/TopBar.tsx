import { useEffect, useRef } from "react";
import { useMinuteUpdate } from "../hooks/useMinuteUpdate";

type TopBarProps = {
  appTitle: string;
  pageName: string;
  menuButtonActivated: boolean;
  dimmingButtonActivated: boolean;
  onMenuButtonClicked: () => void;
  onDimmingButtonClicked: () => void;
};

export function TopBar({
  appTitle,
  pageName,
  menuButtonActivated,
  dimmingButtonActivated,
  onMenuButtonClicked,
  onDimmingButtonClicked,
}: TopBarProps) {
  const topBarRef = useRef<HTMLElement | null>(null);
  const date = useMinuteUpdate();

  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const onDimming = () => onDimmingButtonClicked();
    const onMenu = () => onMenuButtonClicked();
    topBar.addEventListener("menu-button-clicked", onMenu);
    topBar.addEventListener("dimming-button-clicked", onDimming);

    return () => {
      topBar.removeEventListener("menu-button-clicked", onMenu);
      topBar.removeEventListener("dimming-button-clicked", onDimming);
    };
  }, [onDimmingButtonClicked, onMenuButtonClicked]);

  return (
    <obc-top-bar
      ref={topBarRef}
      appTitle={appTitle}
      pageName={pageName}
      menuButtonActivated={menuButtonActivated}
      showClock
      showDimmingButton
      dimmingButtonActivated={dimmingButtonActivated}
    >
      <obc-clock slot="clock" date={date}></obc-clock>
    </obc-top-bar>
  );
}
