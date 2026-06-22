import { Dashboard } from "./pages/Dashboard";
import { Link } from "react-router-dom";
import { KitchenQRCode } from "./components/KitchenQRCode";

function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 250,
          background: "#1f2937",
          color: "#fff",
          padding: 20,
        }}
      >
        <h2>🍕 Pizza Alert</h2>
        <Link
          to="/"
          style={{
            color: "#fff",
            display: "block",
            marginBottom: 10,
          }}
        >
          Pedidos
        </Link>

        <Link
          to="/kitchen"
          style={{
            color: "#fff",
            display: "block",
            marginBottom: 10,
          }}
        >
          Cozinha
        </Link>

        <Link
          to="/tv"
          style={{
            color: "#fff",
            display: "block",
            marginBottom: 10,
          }}
        >
          TV
        </Link>
        <Link
          to="/new"
          style={{
            color: "#fff",
            display: "block",
            marginBottom: 10,
          }}
        >
          Novo Pedido
        </Link>
        <Link
          to="/settings"
          style={{
            color: "#fff",
            display: "block",
            marginBottom: 10,
          }}
        >
          Configurações
        </Link>
        <KitchenQRCode />
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
