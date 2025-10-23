import { IProduct, IProductVariant } from "@/@types/IProduct";
import { mockProducts } from "@/utils/mock-data";
import { useQuery } from "@tanstack/react-query";

export const PRODUCT_BY_SLUG_KEY = (slug: string) => ["products", "slug", slug];

const useGetProductVariantBySlug = (slug: string) => {
  // Fazer uma lista baseado nos atributos "variants" de todos produtos
  const productVariants = mockProducts.flatMap((product) => {
    return product.variants.map((variant) => ({
      ...variant,
    }));
  });

  // Encontrar a variante do produto pelo slug
  const productVariant = productVariants.find(
    (variantItem) => variantItem.slug === slug
  );

  // Procurar o produto específico dessa variant
  const product = mockProducts.find(
    (productItem) => productItem.id === productVariant?.productId
  );

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  if (!productVariant) {
    throw new Error("Variante do produto não encontrada");
  }

  // Procurar as outras variantes do produto
  const otherProductVariants = productVariants.filter(
    (productItem) => productItem.productId === product?.id
  );

  return useQuery({
    queryKey: PRODUCT_BY_SLUG_KEY(slug),
    queryFn: async (): Promise<
      IProductVariant & {
        product: IProduct;
        otherProductVariants: IProductVariant[];
      }
    > => {
      return {
        ...productVariant,
        product,
        otherProductVariants,
      };
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetProductVariantBySlug };
