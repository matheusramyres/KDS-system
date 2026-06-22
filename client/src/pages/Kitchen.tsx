import { useOrderStore } from "../store/orderStore";
import { OrderCard } from "../components/OrderCard";
import { Link } from "react-router-dom";

export function Kitchen() {
  const orders = useOrderStore((state) => state.orders);
  const sortedOrders = [...orders].sort((a, b) => {
    const getTimeLeft = (order: any) => {
      const start = new Date(order.createdAt).getTime();
      const end = start + order.preparationTime * 60000;
      return end - Date.now();
    };

    return getTimeLeft(a) - getTimeLeft(b);
  });

  return (
    <div style={{ padding: 20 }}>
      <Link
        to="/"
        style={{
          color: "#000000",
          display: "block",
          marginBottom: 10,
        }}
      >
        Voltar
      </Link>
      <h1>🍕 Cozinha</h1>

      {sortedOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
