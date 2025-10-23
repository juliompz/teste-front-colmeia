"use client";

import { IProduct } from "@/@types/IProduct";
import ProductItem from "../product-item";
import { AlertErrorWithReload } from "../alert-error-with-reload";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductListProps {
  title: string;
  isError: boolean;
  isLoading: boolean;
  refetchQueryKey: string[];
  products: IProduct[];
}

const ProductList = ({
  title,
  products,
  isError,
  isLoading,
  refetchQueryKey,
}: ProductListProps) => {
  if (isLoading) {
    return (
      <div>
        <p className="px-5 font-semibold">{title}</p>
        <div className="flex w-full gap-4 overflow-x-auto px-5 ">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className=" h-56 w-full rounded-lg " />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <AlertErrorWithReload refetchQueryKey={refetchQueryKey} />;
  }

  return (
    <div className="space-y-6">
      <p className="px-5 font-semibold">{title}</p>
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
