import { useAddressStore } from "@/zustand/address-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ADDRESS_KEY } from "./use-get-address";

const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { removeAddress } = useAddressStore();
  const { mutateAsync } = useMutation({
    mutationFn: async (addressId: string) => {
      removeAddress(addressId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Endereço removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ADDRESS_KEY });
    },
  });
  return { mutateAsync };
};

export { useDeleteAddress };
