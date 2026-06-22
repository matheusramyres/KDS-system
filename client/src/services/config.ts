export async function getServerConfig() {
  const url = import.meta.env.VITE_SERVER_URL;
  const res = await fetch(`${url}/config`);
  return res.json();
}
