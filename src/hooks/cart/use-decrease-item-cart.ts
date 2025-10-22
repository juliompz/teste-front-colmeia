import { IProductVariant } from "@/@types/IProduct";
import { useCartStore } from "@/zustand/cart-storage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDecreaseItemCart = () => {
  const { decreaseItem } = useCartStore();
  const { mutateAsync } = useMutation({
    mutationFn: async (productId: number) => {
      decreaseItem(productId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Quantidade do produto diminuida.");
    },
  });
  return { mutateAsync };
};

export { useDecreaseItemCart };
