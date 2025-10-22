import { IProductVariant } from "@/@types/IProduct";
import { useCartStore } from "@/zustand/cart-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useIncreaseItemCart = () => {
  const { increaseItem } = useCartStore();
  const { mutateAsync } = useMutation({
    mutationFn: async (productId: number) => {
      increaseItem(productId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Quantidade do produto aumentada.");
    },
  });
  return { mutateAsync };
};

export { useIncreaseItemCart };
