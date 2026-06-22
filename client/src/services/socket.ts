import { io, Socket } from "socket.io-client";

let socket: Socket;

export async function initSocket() {
  const url = import.meta.env.VITE_SERVER_URL;
  const res = await fetch(`${url}/config`);
  const config = await res.json();

  socket = io(config.socketUrl, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Socket conectado:", socket.id);
  });

  return socket;
}

export function getSocket() {
  if (!socket) {
    throw new Error("Socket ainda não inicializado");
  }

  return socket;
}
