import { ProductList } from "@/components/@shared/product-list";
import {
  PRODUCT_LIKELY_PRODUCTS_KEY,
  useGetLikelyProducts,
} from "@/hooks/products/use-get-likely-products";

interface LikelyProductsProps {
  categoryId: number;
}

const LikelyProducts = ({ categoryId }: LikelyProductsProps) => {
  const {
    data: products,
    isError,
    isLoading,
  } = useGetLikelyProducts(categoryId);

  return (
    <ProductList
      title="Talvez você goste"
      products={products ?? []}
      isError={isError}
      isLoading={isLoading}
      refetchQueryKey={PRODUCT_LIKELY_PRODUCTS_KEY(categoryId)}
    />
  );
};

export { LikelyProducts };
