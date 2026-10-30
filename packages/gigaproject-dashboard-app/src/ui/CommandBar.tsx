import { ObcButton } from "@oicl/openbridge-webcomponents-react/components/button/button";
import { ObcToggleButtonGroup } from "@oicl/openbridge-webcomponents-react/components/toggle-button-group/toggle-button-group";
import { ObcToggleButtonOption } from "@oicl/openbridge-webcomponents-react/components/toggle-button-option/toggle-button-option";
import { ObcBadgeCommand } from "@oicl/openbridge-webcomponents-react/navigation-instruments/badge-command/badge-command";
import { ButtonVariant } from "@oicl/openbridge-webcomponents/dist/components/button/button.js";
import { CommandStatus } from "@oicl/openbridge-webcomponents/dist/navigation-instruments/badge-command/badge-command.js";
import type { ControlMode, VesselDispatch } from "../hooks/useVesselControl";

type CommandBarProps = {
  mode: ControlMode;
  dispatch: VesselDispatch;
};

const statusText: Record<ControlMode, string> = {
  mission: "Autonomous: following mission",
  heading: "In command: heading and speed",
  manual: "In command: thruster control",
};

export function CommandBar({ mode, dispatch }: CommandBarProps) {
  return (
    <div className="command-bar">
      <ObcBadgeCommand
        status={mode === "mission" ? CommandStatus.NoCommand : CommandStatus.InCommand}
      />
      <span className="command-status">{statusText[mode]}</span>
      <ObcToggleButtonGroup
        className="command-modes"
        value={mode}
        onChange={(event) =>
          dispatch({ type: "setMode", mode: event.detail.value as ControlMode })
        }
      >
        <ObcToggleButtonOption value="mission">Mission</ObcToggleButtonOption>
        <ObcToggleButtonOption value="heading">Heading</ObcToggleButtonOption>
        <ObcToggleButtonOption value="manual">Manual</ObcToggleButtonOption>
      </ObcToggleButtonGroup>
      <ObcButton
        className="command-stop"
        variant={ButtonVariant.raised}
        onClick={() => dispatch({ type: "stop" })}
      >
        Stop vessel
      </ObcButton>
    </div>
  );
}
