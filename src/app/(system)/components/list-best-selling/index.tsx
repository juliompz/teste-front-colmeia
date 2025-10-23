"use client";
import { ProductList } from "@/components/@shared/product-list";
import {
  BEST_SELLING_PRODUCTS,
  useGetBestSellingProducts,
} from "@/hooks/products/use-get-best-selling-products";
import React from "react";

const ListBestSellingProduct = () => {
  const { data: products, isError, isLoading } = useGetBestSellingProducts();

  return (
    <ProductList
      title="Mais vendidos"
      products={products ?? []}
      isError={isError}
      isLoading={isLoading}
      refetchQueryKey={BEST_SELLING_PRODUCTS}
    />
  );
};

export { ListBestSellingProduct };
