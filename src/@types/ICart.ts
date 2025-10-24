import { IProductVariant } from "./IProduct";

export interface ICartItem {
  id: number;
  productVariant: IProductVariant;
  quantity: number;
}
