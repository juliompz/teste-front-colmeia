import { useCheckoutStore } from "@/zustand/checkout-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useFinishCheckout = () => {
  const { push } = useRouter();
  const { finishCheckout } = useCheckoutStore();
  return useMutation({
    mutationFn: async (checkoutId: string) => {
      return finishCheckout(checkoutId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data, checkoutId) => {
      push(`/checkout/${checkoutId}/finalizar`);
    },
  });
};

export { useFinishCheckout };
