"use client";
import React from "react";
import Image from "next/image";
import { formatMoneyBrl } from "@/utils/masks/format-money-brl";
import { IProductVariant } from "@/@types/IProduct";
import {
  PRODUCT_BY_SLUG_KEY,
  useGetProductVariantBySlug,
} from "@/hooks/products/use-get-product-variant-by-slug";
import { ProductActions } from "./product-actions";
import { LikelyProducts } from "./list-likely-products";
import { VariantSelector } from "./variant-selector";
import { Loader2 } from "lucide-react";
import { ErrorWithImage } from "@/components/@shared/error-with-image";

const WrapperProduct = ({ slug }: { slug: string }) => {
  const {
    data: productVariant,
    isError,
    isLoading,
  } = useGetProductVariantBySlug(slug);

  if (isLoading) {
    return (
      <div className="flex justify-center aspect-video items-center">
        <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorWithImage
        refetchQueries={PRODUCT_BY_SLUG_KEY(slug)}
        title="Não foi possível carregar o produto"
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col space-y-6 md:flex-row space-x-6 pb-6">
        <div className="w-full md:w-1/2">
          <Image
            src={productVariant?.imageUrl ?? ""}
            alt={productVariant?.name ?? ""}
            sizes="100vw"
            height={0}
            width={0}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-8">
          <VariantSelector
            selectedVariantSlug={productVariant?.slug ?? ""}
            variants={productVariant?.otherProductVariants ?? []}
          />

          <div className="space-y-4 ">
            <div>
              <h1 className="text-2xl font-bold">
                {productVariant?.product.name}
              </h1>
              <h3 className="text-muted-foreground text-sm">
                variação: {productVariant?.name}
              </h3>

              <p className="text-shadow-amber-600 my-2">
                {productVariant?.product.description}
              </p>

              <p className="text-3xl font-semibold mt-3">
                {formatMoneyBrl(productVariant?.priceInCents ?? 0)}
              </p>
            </div>

            <ProductActions
              productVariant={productVariant ?? ({} as IProductVariant)}
            />
          </div>
        </div>
      </div>
      <LikelyProducts categoryId={productVariant?.product.categoryId ?? 0} />
    </div>
  );
};

export { WrapperProduct };
