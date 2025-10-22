import { ProductList } from "@/components/@shared/product-list/product-list";
import { mockProducts } from "@/utils/mock-data";
import React from "react";

interface LikelyProductsProps {
  categoryId: number;
}

const LikelyProducts = ({ categoryId }: LikelyProductsProps) => {
  const products = mockProducts.flatMap((product) => {
    return product.variants.map((variant) => ({
      ...product,
      ...variant,
    }));
  });

  const filteredProducts = products.filter(
    (product) => product.categoryId === categoryId
  );

  return (
    <div>
      <ProductList title="Talvez você goste" products={filteredProducts} />
    </div>
  );
};

export { LikelyProducts };
