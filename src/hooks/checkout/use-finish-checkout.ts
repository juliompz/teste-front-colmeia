import { useCartStore } from "@/zustand/cart-store";
import { useCheckoutStore } from "@/zustand/checkout-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useFinishCheckout = () => {
  const { push } = useRouter();
  const { finishCheckout } = useCheckoutStore();
  const { clearCart } = useCartStore();
  return useMutation({
    mutationFn: async ({
      checkoutId,
      createdByCart,
    }: {
      checkoutId: string;
      createdByCart?: boolean;
    }) => {
      return finishCheckout(checkoutId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (_, data) => {
      if (data.createdByCart) {
        clearCart();
      }
      push(`/checkout/${data.checkoutId}/finalizar`);
    },
  });
};

export { useFinishCheckout };
