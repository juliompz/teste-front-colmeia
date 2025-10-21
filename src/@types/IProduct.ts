export interface IProduct {
  id: number;
  name: string;
  description: string;
  categoryId: number;

  best_selling?: boolean;
  variants: IProductVariant[];
}

export interface IProductVariant {
  id: number;
  name: string;
  priceInCents: number;
  imageUrl: string;
  slug: string;
}
