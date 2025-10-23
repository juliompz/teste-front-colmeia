import { IProduct } from "@/@types/IProduct";
import { mockProducts } from "@/utils/mock-data";
import { useQuery } from "@tanstack/react-query";

export const BEST_SELLING_PRODUCTS = ["products", "best-selling"];

const useGetBestSellingProducts = () => {
  const bestSellingProducts = mockProducts.filter(
    (product) => product.best_selling === true
  );

  return useQuery({
    queryKey: BEST_SELLING_PRODUCTS,
    queryFn: async (): Promise<IProduct[]> => {
      return bestSellingProducts;
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetBestSellingProducts };
