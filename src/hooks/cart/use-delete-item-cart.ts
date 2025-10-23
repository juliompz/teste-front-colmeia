import { useCartStore } from "@/zustand/cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PRODUCTS_CART_KEY } from "./use-get-product-cart";

const useDeleteItemCart = () => {
  const queryClient = useQueryClient();
  const { removeItem } = useCartStore();
  const { mutateAsync } = useMutation({
    mutationFn: async (productId: number) => {
      removeItem(productId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_CART_KEY });
      toast.success("Produto removido do carrinho.");
    },
  });
  return { mutateAsync };
};

export { useDeleteItemCart };
