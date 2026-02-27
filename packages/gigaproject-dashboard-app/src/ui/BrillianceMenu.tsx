import { useEffect, useRef } from "react";

type BrillianceMenuProps = {
  className?: string;
};

export function BrillianceMenu({ className }: BrillianceMenuProps) {
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = menuRef.current;
    if (!element) return;

    const onPaletteChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ value: string }>;
      const palette = customEvent.detail?.value;
      if (palette) {
        document.documentElement.setAttribute("data-obc-theme", palette);
      }
    };

    element.addEventListener("palette-changed", onPaletteChange);
    return () => {
      element.removeEventListener("palette-changed", onPaletteChange);
    };
  }, []);

  return (
    <obc-brilliance-menu
      ref={menuRef}
      className={className}
    ></obc-brilliance-menu>
  );
}
