import { ProductList } from "@/components/@shared/product-list";
import { mockProducts } from "@/utils/mock-data";
import React from "react";

const ListBestSellingProduct = () => {
  // Para produtos mais vendidos, filtramos os que têm best_selling: true
  const bestSellingProducts = mockProducts.filter(
    (product) => product.best_selling === true
  );

  return <ProductList title="Mais vendidos" products={bestSellingProducts} />;
};

export { ListBestSellingProduct };
