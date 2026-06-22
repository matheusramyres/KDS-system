import { create } from "zustand";
import type { Order } from "../types/Order";

interface OrderStore {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  finishOrder: (id: number) => void;
  updateStatus: (id: number, status: Order["status"]) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],

  setOrders: (orders) => set({ orders }),

  addOrder: (order: Order) =>
    set((state) => {
      const exists = state.orders.some((o) => o.id === order.id);

      if (exists) return state;

      return {
        orders: [...state.orders, order],
      };
    }),

  updateStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    })),

  finishOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),
}));
