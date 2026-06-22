import os from "os";

export function getLocalIP() {
  const interfaces = os.networkInterfaces();

  let fallback = "localhost";

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family !== "IPv4" || net.internal) continue;

      // ❌ ignora APIPA (169.254.x.x)
      if (net.address.startsWith("169.254")) continue;

      // ❌ ignora loopback
      if (net.address === "127.0.0.1") continue;

      // ✔ prioriza rede local padrão
      if (net.address.startsWith("192.168")) {
        return net.address;
      }

      // fallback seguro
      fallback = net.address;
    }
  }

  return fallback;
}
