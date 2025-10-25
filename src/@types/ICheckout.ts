import { IAddress } from "./IAddress";
import { ICartItem } from "./ICart";

export enum CHECKOUT_STATUS_ENUM {
  CONCLUIDO = "concluido",
  CANCELADO = "cancelado",
  PENDENTE = "pendente",
}

export enum PAYMENT_METHOD_ENUM {
  PIX = "pix",
  CREDIT_CARD = "card",
  BOLETO = "boleto",
}

export interface ICheckout {
  id: string;
  items: ICartItem[];
  totalPriceInCents: number;
  status: CHECKOUT_STATUS_ENUM;
  paymentMethod: PAYMENT_METHOD_ENUM | null;
  deliveryAddress: IAddress | null;
  createdByCart?: boolean;
}
