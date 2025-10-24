import { ICartItem } from "@/@types/ICart";
import { CHECKOUT_STATUS_ENUM, ICheckout } from "@/@types/ICheckout";
import { useCheckoutStore } from "@/zustand/checkout-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateCheckout = () => {
  const queryClient = useQueryClient();
  const { createCheckout } = useCheckoutStore();
  return useMutation({
    mutationFn: async ({
      items,
      status,
    }: {
      items: ICartItem[];
      status: CHECKOUT_STATUS_ENUM;
    }): Promise<ICheckout> => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simula latência
      return createCheckout(items, status);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
};

export { useCreateCheckout };
