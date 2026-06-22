import { useEffect, useState } from "react";

export function useServerConfig() {
  const [config, setConfig] = useState<any>(null);
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetch(`${url}/config`)
      .then((res) => res.json())
      .then(setConfig);
  }, [url]);

  return config;
}
