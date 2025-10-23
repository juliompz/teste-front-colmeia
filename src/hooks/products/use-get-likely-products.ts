import { IProduct, IProductVariant } from "@/@types/IProduct";
import { mockProducts } from "@/utils/mock-data";
import { useQuery } from "@tanstack/react-query";

export const PRODUCT_LIKELY_PRODUCTS_KEY = (categoryId: number) => [
  "products",
  "likely",
  String(categoryId),
];

const useGetLikelyProducts = (categoryId: number) => {
  // Fazer uma lista baseado nos atributos "variants" de todos produtos
  const productVariants = mockProducts.filter(
    (item) => item.categoryId === categoryId
  );

  return useQuery({
    queryKey: PRODUCT_LIKELY_PRODUCTS_KEY(categoryId),
    queryFn: async (): Promise<IProduct[]> => {
      return productVariants;
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetLikelyProducts };
