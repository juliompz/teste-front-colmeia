"use client";
import React from "react";
import Image from "next/image";
import { formatMoneyBrl } from "@/utils/masks/format-money-brl";
import { IProductVariant } from "@/@types/IProduct";
import {
  PRODUCT_BY_SLUG_KEY,
  useGetProductVariantBySlug,
} from "@/hooks/products/use-get-product-variant-by-slug";
import { ProductActions } from "../product-actions";
import { LikelyProducts } from "../list-likely-products/list-likely-products";
import { VariantSelector } from "../variant-selector";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

const Wrapper = ({ slug }: { slug: string }) => {
  const queryClient = useQueryClient();
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
      <div className="flex flex-col space-y-6 md:flex-row space-x-6">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/error-image.png"
            alt="error"
            sizes="100vw"
            height={0}
            width={0}
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 text-center">
          <p className="font-bold text-2xl">
            Não foi possível acessar o produto
          </p>
          <p className="text-muted-foreground text-sm">
            Tente novamente mais tarde!
          </p>

          <Button
            variant={"outline"}
            onClick={() =>
              queryClient.refetchQueries({
                queryKey: PRODUCT_BY_SLUG_KEY(slug),
              })
            }
          >
            <RefreshCcw />
            Recarregar
          </Button>
        </div>
      </div>
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

export { Wrapper };
