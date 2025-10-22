import { IProductVariant } from "@/@types/IProduct";
import { useCartStore } from "@/zustand/cart-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useAddProductToCart = () => {
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
      toast.success("Cadastro efetuado com sucesso!");
    },
  });
  return { mutateAsync };
};

export { useAddProductToCart };
