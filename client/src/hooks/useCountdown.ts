import { useEffect, useState } from "react";

export function useCountdown(createdAt: string, minutes: number) {
  const [timeLeft, setTimeLeft] = useState({ min: 0, sec: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(createdAt).getTime();
      const end = start + minutes * 60000;
      const now = Date.now();

      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ min: 0, sec: 0 });
        return;
      }

      const min = Math.floor(diff / 60000);
      const sec = Math.floor((diff % 60000) / 1000);

      setTimeLeft({ min, sec });
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt, minutes]);

  return timeLeft;
}
