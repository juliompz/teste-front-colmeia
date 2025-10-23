import { useCartStore } from "@/zustand/cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PRODUCTS_CART_KEY } from "./use-get-product-cart";

const useDecreaseItemCart = () => {
  const queryClient = useQueryClient();
  const { decreaseItem } = useCartStore();
  const { mutateAsync } = useMutation({
    mutationFn: async (productId: number) => {
      decreaseItem(productId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_CART_KEY });

      toast.success("Quantidade do produto diminuida.");
    },
  });
  return { mutateAsync };
};

export { useDecreaseItemCart };
