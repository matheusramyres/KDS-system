import { useState } from "react";
import { getSocket } from "../services/socket";
import "../styles/forms.css";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Pizza Grande",
    time: 50,
  },
  {
    name: "Pizza Média",
    time: 40,
  },
  {
    name: "Calzone",
    time: 30,
  },
  {
    name: "Hambúrguer",
    time: 20,
  },
];

export function NewOrder() {
  let socket = getSocket();
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [time, setTime] = useState(50);
  const [alert, setAlert] = useState(10);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    socket.emit("new-order", {
      customer,
      product,
      preparationTime: Number(time),
      alertTime: Number(alert),
      createdAt: new Date().toISOString(),
      status: "esperando",
    });

    setCustomer("");
    setProduct("");
  }

  return (
    <div className="page">
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
      <h1>Novo Pedido</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cliente</label>

          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Produto</label>
          <select
            value={product}
            onChange={(e) => {
              const selected = products.find((p) => p.name === e.target.value);

              if (selected) {
                setProduct(selected.name);
                setTime(selected.time);
              }
            }}
          >
            <option value="">Selecione</option>

            {products.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tempo de preparo</label>

          <input
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Alerta</label>

          <input
            type="number"
            value={alert}
            onChange={(e) => setAlert(Number(e.target.value))}
          />
        </div>

        <button type="submit" autoFocus className="save-button">
          Salvar Pedido
        </button>
      </form>
    </div>
  );
}
