import { useEffect, useState } from "react";
import type { Order } from "../types/Order";
import { getSocket } from "../services/socket";
import { playSound, stopSound } from "../utils/sound";
import { useCountdown } from "../hooks/useCountdown";
import "../styles/orderCard.css";

interface Props {
  order: Order;
}

export function OrderCard({ order }: Props) {
  const { min, sec } = useCountdown(order.createdAt, order.preparationTime);
  let socket = getSocket();
  const [remaining, setRemaining] = useState(0);

  const [alerted, setAlerted] = useState(
    order.alerted || { warning: false, late: false },
  );

  function handleFinish() {
    stopSound(order.id);

    socket.emit("finish-order", order.id);
  }

  function setStatus(status: string) {
    socket.emit("update-status", {
      id: order.id,
      status,
    });
  }

  function getUrgencyColor(order: any) {
    const start = new Date(order.createdAt).getTime();
    const end = start + order.preparationTime * 60000;
    const diff = end - Date.now();

    if (diff <= 0) return "#ef4444"; // vermelho (atrasado)
    if (diff < 5 * 60 * 1000) return "#f59e0b"; // amarelo (quase)
    return "#22c55e"; // verde (ok)
  }

  useEffect(() => {
    const update = () => {
      const created = new Date(order.createdAt);

      const elapsed = Math.floor((Date.now() - created.getTime()) / 1000 / 60);

      const timeLeft = order.preparationTime - elapsed;

      setRemaining(timeLeft);

      // 🔔 ALERTA (zona amarela)
      if (timeLeft <= order.alertTime && timeLeft > 0 && !alerted.warning) {
        playSound(order.id, "alert");

        setAlerted((prev) => ({
          ...prev,
          warning: true,
        }));
      }

      // 🔴 ATRASADO
      if (timeLeft <= 0 && !alerted.late) {
        playSound(order.id, "late");

        setAlerted((prev) => ({
          ...prev,
          late: true,
        }));
      }
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [order, alerted]);

  let background = "#22c55e";
  let status = "No prazo";

  if (remaining <= order.alertTime) {
    background = "#facc15";
    status = "Atenção";
  }

  if (remaining <= 0) {
    background = "#ef4444";
    status = "Atrasado";
  }

  const color = getUrgencyColor(order);
  const isLate = color === "#ef4444";

  return (
    <div
      className={`order-card ${isLate ? "blink" : ""}`}
      style={{
        borderLeft: `6px solid ${color}`,
      }}
    >
      <h2>Pedido #{order.id}</h2>
      <p>{order.customer}</p>
      <p>{order.product}</p>

      <p>
        ⏳ {min}:{sec.toString().padStart(2, "0")}
      </p>

      <h3>
        {remaining > 0
          ? `${remaining} min`
          : `${Math.abs(remaining)} min atrasado`}
      </h3>

      <strong>{remaining > 0 ? "No prazo" : "Atrasado"}</strong>

      <p>
        Status: <strong>{order.status}</strong>
      </p>

      <button onClick={handleFinish}>Finalizar</button>

      <div className="order-card-buttons">
        <button onClick={() => setStatus("preparando")}>Preparo</button>

        <button onClick={() => setStatus("forno")}>Forno</button>

        <button onClick={() => setStatus("pronto")}>Pronto</button>
      </div>
    </div>
  );
}
