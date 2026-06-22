import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { Kitchen } from "../pages/Kitchen";
import { TV } from "../pages/TV";
import { SocketProvider } from "../components/SocketProvider";
import { NewOrder } from "../pages/NewOrder";

export function AppRouter() {
  return (
    <BrowserRouter>
      <SocketProvider />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/new" element={<NewOrder />} />
      </Routes>
    </BrowserRouter>
  );
}
