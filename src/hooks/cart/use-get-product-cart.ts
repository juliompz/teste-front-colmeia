import { ICartItem, useCartStore } from "@/zustand/cart-store";
import { useQuery } from "@tanstack/react-query";

export const PRODUCTS_CART_KEY = ["cart", "products"];

const useGetProductsCart = () => {
  const { items, totalPriceInCents } = useCartStore();
  return useQuery({
    queryKey: PRODUCTS_CART_KEY,
    queryFn: async (): Promise<{
      products: ICartItem[];
      totalPriceInCents: number;
    }> => {
      return {
        products: items,
        totalPriceInCents,
      };
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetProductsCart };
