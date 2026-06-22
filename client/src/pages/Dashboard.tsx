import { OrderCard } from "../components/OrderCard";
import { useOrderStore } from "../store/orderStore";

export function Dashboard() {
  const orders = useOrderStore((state) => state.orders);

  return (
    <div>
      <h1>Pedidos em produção</h1>

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
