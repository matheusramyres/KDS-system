import { useEffect } from "react";
import { initSocket, getSocket } from "../services/socket";
import { useOrderStore } from "../store/orderStore";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import type { Socket } from "socket.io-client";

export function SocketProvider() {
  const setOrders = useOrderStore((state) => state.setOrders);
  const addOrder = useOrderStore((state) => state.addOrder);
  const finishOrder = useOrderStore((state) => state.finishOrder);
  const updateStatus = useOrderStore((state) => state.updateStatus);

  useEffect(() => {
    let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

    async function start() {
      socket = await initSocket();

      socket.on("connect", () => {
        console.log("CONNECT MOBILE:", socket.id);
        socket.emit("get-orders");
      });

      socket.on("orders", setOrders);
      socket.on("new-order", addOrder);
      socket.on("order-finished", finishOrder);
      //   socket.on("status-updated", updateStatus);
      socket.on("status-updated", ({ id, status }) => {
        updateStatus(id, status);
      });
    }

    start();

    return () => {
      if (!socket) return;

      socket.off("orders");
      socket.off("new-order");
      socket.off("order-finished");
      socket.off("status-updated");
    };
  }, []);

  return null;
}
