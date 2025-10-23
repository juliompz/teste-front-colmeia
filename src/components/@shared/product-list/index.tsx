"use client";

import { IProduct } from "@/@types/IProduct";
import ProductItem from "../product-item";

interface ProductListProps {
  title: string;
  products: IProduct[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div
        className="flex w-full gap-4 overflow-x-auto px-5 
        sm:[&::-webkit-scrollbar]:hidden
        md:[&::-webkit-scrollbar]:block
        md:[&::-webkit-scrollbar]:h-[6px]
        md:[&::-webkit-scrollbar-track]:bg-transparent
      md:[&::-webkit-scrollbar-thumb]:bg-gray-300
        md:[&::-webkit-scrollbar-thumb]:rounded-full
    "
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export { ProductList };
