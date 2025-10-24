import { IAddress } from "@/@types/IAddress";
import { useCheckoutStore } from "@/zustand/checkout-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateCheckoutAddress = () => {
  const queryClient = useQueryClient();
  const { updateCheckoutAddress } = useCheckoutStore();
  return useMutation({
    mutationFn: async ({
      checkoutId,
      address,
    }: {
      checkoutId: string;
      address: IAddress;
    }) => {
      return updateCheckoutAddress(checkoutId, address);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
      toast.success("Endereço do pedido atualizado com sucesso!");
    },
  });
};

export { useUpdateCheckoutAddress };
