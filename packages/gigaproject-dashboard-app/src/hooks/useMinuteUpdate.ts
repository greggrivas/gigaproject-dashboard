import { useEffect, useState } from "react";

export function useMinuteUpdate(): string {
  const [isoTime, setIsoTime] = useState(() => new Date().toISOString());

  useEffect(() => {
    let intervalId: number | undefined;
    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeoutId = window.setTimeout(() => {
      setIsoTime(new Date().toISOString());

      intervalId = window.setInterval(() => {
        setIsoTime(new Date().toISOString());
      }, 60_000);
    }, Math.max(msUntilNextMinute, 0));

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return isoTime;
}
