import { IProduct } from "@/@types/IProduct";
import { mockProducts } from "@/utils/mock-data";
import { useQuery } from "@tanstack/react-query";

export const NEW_PRODUCTS_KEY = ["products", "new"];

const useGetNewProducts = () => {
  const bestSellingProducts = mockProducts.filter(
    (product) => product.best_selling !== true
  );

  return useQuery({
    queryKey: NEW_PRODUCTS_KEY,
    queryFn: async (): Promise<IProduct[]> => {
      return bestSellingProducts;
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetNewProducts };
