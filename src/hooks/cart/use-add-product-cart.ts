import { IProductVariant } from "@/@types/IProduct";
import { useCartStore } from "@/zustand/cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PRODUCTS_CART_KEY } from "./use-get-product-cart";

const useAddProductToCart = () => {
  const queryClient = useQueryClient();
  const { addItem } = useCartStore();
  const { mutateAsync } = useMutation({
    mutationFn: async ({
      product,
      quantity,
    }: {
      product: IProductVariant;
      quantity: number;
    }) => {
      addItem(product, quantity);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_CART_KEY });

      toast.success("Cadastro efetuado com sucesso!");
    },
  });
  return { mutateAsync };
};

export { useAddProductToCart };
