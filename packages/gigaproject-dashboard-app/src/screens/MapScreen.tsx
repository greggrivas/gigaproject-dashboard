import { ObcAlertIcon } from "@oicl/openbridge-webcomponents-react/components/alert-icon/alert-icon";
import { ObcButton } from "@oicl/openbridge-webcomponents-react/components/button/button";
import { AlertType } from "@oicl/openbridge-webcomponents/dist/types.js";
import { activeAlerts, mission, missionActions, usvFleet } from "../data/vessel";
import { Panel } from "../ui/Panel";

function RowList({ rows, activeRow }: { rows: string[]; activeRow: string }) {
  return (
    <div className="mission-list">
      {rows.map((row) => (
        <div key={row} className={row === activeRow ? "row active" : "row"}>
          {row}
        </div>
      ))}
    </div>
  );
}

export function MapScreen() {
  return (
    <section className="map-shell">
      <aside className="map-sidepanel">
        <Panel title="Mission Control">
          <div className="mission-name">{mission.name}</div>
          <RowList rows={missionActions} activeRow={mission.activeAction} />
        </Panel>
        <Panel title="USV List">
          <RowList rows={usvFleet} activeRow={mission.activeUsv} />
        </Panel>
      </aside>

      <Panel title="Map">
        <div className="map-alertbar">
          <ObcAlertIcon alertType={AlertType.Warning} />
          <span>{activeAlerts[0]}</span>
          <ObcButton>Ack</ObcButton>
          <ObcButton>Go to</ObcButton>
        </div>
        <div className="map-canvas">
          <div className="map-overlay">OpenCPN Strategic Map Placeholder</div>
          <div className="map-tools">
            <ObcButton>+</ObcButton>
            <ObcButton>-</ObcButton>
            <ObcButton>Layers</ObcButton>
            <ObcButton>Track</ObcButton>
          </div>
        </div>
      </Panel>
    </section>
  );
}
