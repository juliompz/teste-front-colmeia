import ProductList from "@/components/@shared/product-list/product-list";
import { mockProducts } from "@/utils/mock-data";
import React from "react";

const ListNewProducts = () => {
  // Para produtos mais vendidos, filtramos os que têm best_selling: true
  const bestSellingProducts = mockProducts.filter(
    (product) => product.best_selling === true
  );

  return <ProductList title="Novos produtos" products={bestSellingProducts} />;
};

export { ListNewProducts };
