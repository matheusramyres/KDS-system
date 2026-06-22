import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { OrdersRepo } from "./db/ordersRepo";
import { db } from "./db/database";
import { getLocalIP } from "./utils/getLocalIp";

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("get-orders", () => {
    const orders = OrdersRepo.getAll();

    console.log("SYNC enviado:", orders.length);

    socket.emit("orders", orders);
  });

  socket.on("new-order", (order) => {
    const saved = OrdersRepo.create(order);

    io.emit("new-order", saved);
  });

  socket.on("finish-order", (id) => {
    OrdersRepo.delete(id);

    io.emit("order-finished", id);
  });

  socket.on("disconnect", () => {
    console.log("Cliente saiu:", socket.id);
  });
  socket.on("update-status", ({ id, status }) => {
    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);

    io.emit("status-updated", {
      id,
      status,
    });
  });
});

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.get("/config", (req, res) => {
  const ip = getLocalIP();

  res.json({
    ip,
    port: 3001,
    socketUrl: `http://${ip}:3001`,
    frontendUrl: `http://${ip}:5173`,
  });
});

httpServer.listen(3001, () => {
  console.log("Servidor Socket.IO rodando");
});
