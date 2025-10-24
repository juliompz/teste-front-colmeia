import { ICartItem } from "./ICart";

export enum CHECKOUT_STATUS_ENUM {
  CONCLUIDO = "concluido",
  CANCELADO = "cancelado",
  PENDENTE = "pendente",
}

export interface ICheckout {
  id: string;
  items: ICartItem[];
  totalPriceInCents: number;
  status: CHECKOUT_STATUS_ENUM;
}
