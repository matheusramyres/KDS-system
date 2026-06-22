import { QRCodeCanvas } from "qrcode.react";
import { useServerConfig } from "../hooks/useServerConfig";

export function KitchenQRCode() {
  const config = useServerConfig();

  if (!config) {
    return <p>Carregando QR Code...</p>;
  }

  const url = `${config.frontendUrl}/kitchen`;

  return (
    <div
      style={{
        background: "#111",
        padding: 20,
        borderRadius: 10,
        color: "#fff",
        marginTop: 20,
        textAlign: "center",
      }}
    >
      <h3>📱 Acesse a Cozinha</h3>

      <p style={{ fontSize: 12 }}>Escaneie para abrir no celular/tablet</p>

      <div
        style={{
          background: "#fff",
          padding: 10,
          display: "inline-block",
          borderRadius: 10,
        }}
      >
        <QRCodeCanvas value={url} size={180} />
      </div>

      <p style={{ fontSize: 12, marginTop: 10 }}>{url}</p>
    </div>
  );
}
