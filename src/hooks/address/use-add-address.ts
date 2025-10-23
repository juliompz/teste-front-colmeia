import { IAddress } from "@/@types/IAddress";
import { useAddressStore } from "@/zustand/address-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ADDRESS_KEY } from "./use-get-address";

const useAddAddress = () => {
  const queryClient = useQueryClient();

  const { addAddress } = useAddressStore();
  const { mutateAsync } = useMutation({
    mutationFn: async (address: Omit<IAddress, "id">) => {
      addAddress(address);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Endereço cadastrado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ADDRESS_KEY });
    },
  });
  return { mutateAsync };
};

export { useAddAddress };
