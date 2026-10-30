import type { ReactNode } from "react";
import { ObcCard } from "@oicl/openbridge-webcomponents-react/components/card/card";

type PanelProps = {
  title: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

export function Panel({ title, className, bodyClassName, children }: PanelProps) {
  return (
    <ObcCard className={className ? `panel ${className}` : "panel"}>
      <div slot="title" className="panel-title">
        {title}
      </div>
      <div className={bodyClassName ? `panel-body ${bodyClassName}` : "panel-body"}>
        {children}
      </div>
    </ObcCard>
  );
}
