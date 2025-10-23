import { useAddressStore } from "@/zustand/address-store";
import { useQuery } from "@tanstack/react-query";

export const ADDRESS_KEY = ["address"];

const useGetAddress = () => {
  const { addresses } = useAddressStore();
  return useQuery({
    queryKey: ADDRESS_KEY,
    queryFn: async () => {
      return addresses;
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetAddress };
