import { useCartStore } from "@/zustand/cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PRODUCTS_CART_KEY } from "./use-get-product-cart";

const useIncreaseItemCart = () => {
  const queryClient = useQueryClient();
  const { increaseItem } = useCartStore();
  const { mutateAsync } = useMutation({
    mutationFn: async (productId: number) => {
      increaseItem(productId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_CART_KEY });
      toast.success("Quantidade do produto aumentada.");
    },
  });
  return { mutateAsync };
};

export { useIncreaseItemCart };
