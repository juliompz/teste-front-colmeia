import { IProductVariant } from "@/@types/IProduct";
import { useCartStore } from "@/zustand/cart-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteItemCart = () => {
  const { removeItem } = useCartStore();
  const { mutateAsync } = useMutation({
    mutationFn: async (productId: number) => {
      removeItem(productId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Produto removido do carrinho.");
    },
  });
  return { mutateAsync };
};

export { useDeleteItemCart };
