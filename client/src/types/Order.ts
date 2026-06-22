export interface Order {
  id: number;
  customer: string;
  product: string;
  preparationTime: number;
  alertTime: number;
  createdAt: string;

  status: "esperando" | "preparando" | "forno" | "pronto" | "entregue";

  alerted?: {
    warning: boolean;
    late: boolean;
  };
}
