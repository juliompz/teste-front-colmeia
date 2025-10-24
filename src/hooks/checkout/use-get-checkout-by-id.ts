import { useCheckoutStore } from "@/zustand/checkout-store";
import { useQuery } from "@tanstack/react-query";

export const PRODUCTS_CHECKOUT_KEY = (checkoutId: string) => [
  "checkout",
  "products",
  checkoutId,
];

const useGetProductCheckoutById = (checkoutId: string) => {
  const { getCheckoutById } = useCheckoutStore();
  return useQuery({
    queryKey: PRODUCTS_CHECKOUT_KEY(checkoutId),
    queryFn: async () => {
      return getCheckoutById(checkoutId);
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetProductCheckoutById };
