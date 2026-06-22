import { db } from "./database";

export interface Order {
  customer: string;
  product: string;
  preparationTime: number;
  alertTime: number;
  createdAt: string;
  status: "esperando" | "preparando" | "forno" | "pronto" | "entregue";
}

export const OrdersRepo = {
  getAll() {
    return db.prepare("SELECT * FROM orders").all();
  },

  create(order: Order) {
    const stmt = db.prepare(`
      INSERT INTO orders 
      (customer, product, preparationTime, alertTime, createdAt, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      order.customer,
      order.product,
      order.preparationTime,
      order.alertTime,
      order.createdAt,
      order.status,
    );

    return { id: result.lastInsertRowid, ...order };
  },

  delete(id: number) {
    db.prepare("DELETE FROM orders WHERE id = ?").run(id);
  },
};
