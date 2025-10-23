"use client";
import { ProductList } from "@/components/@shared/product-list";
import {
  NEW_PRODUCTS_KEY,
  useGetNewProducts,
} from "@/hooks/products/use-get-new-products";
import React from "react";

const ListNewProducts = () => {
  const { data: products, isError, isLoading } = useGetNewProducts();

  return (
    <ProductList
      title="Novos produtos"
      products={products ?? []}
      isError={isError}
      isLoading={isLoading}
      refetchQueryKey={NEW_PRODUCTS_KEY}
    />
  );
};

export { ListNewProducts };
