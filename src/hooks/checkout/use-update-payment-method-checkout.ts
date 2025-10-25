import { PAYMENT_METHOD_ENUM } from "@/@types/ICheckout";
import { useCheckoutStore } from "@/zustand/checkout-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdatePaymentMethodCheckout = () => {
  const queryClient = useQueryClient();
  const { updateCheckoutPaymentMethod } = useCheckoutStore();
  return useMutation({
    mutationFn: async ({
      checkoutId,
      paymentMethod,
    }: {
      checkoutId: string;
      paymentMethod: PAYMENT_METHOD_ENUM;
    }) => {
      return updateCheckoutPaymentMethod(checkoutId, paymentMethod);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export { useUpdatePaymentMethodCheckout };
