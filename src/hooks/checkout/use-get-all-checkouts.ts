import { useCheckoutStore } from "@/zustand/checkout-store";
import { useQuery } from "@tanstack/react-query";

export const CHECKOUTS_KEY = ["checkouts"];

const useGetAllCheckouts = () => {
  const { checkouts } = useCheckoutStore();

  const orderedCheckoutsByDate = checkouts.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return useQuery({
    queryKey: CHECKOUTS_KEY,
    queryFn: async () => {
      return orderedCheckoutsByDate;
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetAllCheckouts };
