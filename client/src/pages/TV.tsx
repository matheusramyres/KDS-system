import { Link } from "react-router-dom";
import { useOrderStore } from "../store/orderStore";

export function TV() {
  const orders = useOrderStore((state) => state.orders);

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <Link
        to="/"
        style={{
          color: "#ffffff",
          display: "block",
          marginBottom: 10,
        }}
      >
        Voltar
      </Link>
      <h1
        style={{
          color: "#fff",
          fontSize: 42,
          marginBottom: 30,
        }}
      >
        🍕 Pedidos em Produção
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: 20,
        }}
      >
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#222",
              color: "#fff",
              borderRadius: 15,
              padding: 25,
            }}
          >
            <h2
              style={{
                fontSize: 38,
              }}
            >
              #{order.id}
            </h2>

            <h3
              style={{
                fontSize: 32,
              }}
            >
              {order.product}
            </h3>

            <p
              style={{
                fontSize: 24,
              }}
            >
              {order.customer}
            </p>

            <p
              style={{
                fontSize: 28,
              }}
            >
              {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
