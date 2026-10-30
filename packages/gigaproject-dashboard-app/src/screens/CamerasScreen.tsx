import { ObiCameraOff } from "@oicl/openbridge-webcomponents-react/icons/icon-camera-off";
import { cameraFeeds } from "../data/vessel";
import { Panel } from "../ui/Panel";

export function CamerasScreen() {
  return (
    <section className="camera-screen">
      {cameraFeeds.map((feed) => (
        <Panel key={feed.title} title={feed.title}>
          <div className="placeholder-panel">
            <ObiCameraOff />
            {feed.placeholder}
          </div>
        </Panel>
      ))}
    </section>
  );
}
