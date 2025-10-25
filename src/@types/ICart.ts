import { IProductVariant } from "./IProduct";

export interface ICart {
  id: string;
  items: ICartItem[];
  totalPriceInCents: number;
}

export interface ICartItem {
  id: number;
  productVariant: IProductVariant;
  quantity: number;
}
