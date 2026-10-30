import { ObcBrillianceMenu } from "@oicl/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import type { ObcPaletteChangeEvent } from "@oicl/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js";

type BrillianceMenuProps = {
  className?: string;
};

const onPaletteChanged = (event: ObcPaletteChangeEvent) => {
  document.documentElement.setAttribute("data-obc-theme", event.detail.value);
};

export function BrillianceMenu({ className }: BrillianceMenuProps) {
  return (
    <ObcBrillianceMenu
      className={className}
      onPaletteChanged={onPaletteChanged}
    />
  );
}
