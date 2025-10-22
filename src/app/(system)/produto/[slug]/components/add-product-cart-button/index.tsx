"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAddProductToCart } from "@/hooks/cart/use-add-product-cart";
import { IProductVariant } from "@/@types/IProduct";

interface AddToCartButtonProps {
  productVariant: IProductVariant;
  quantity: number;
}

const AddProductToCartButton = ({
  productVariant,
  quantity,
}: AddToCartButtonProps) => {
  const { mutateAsync: addProductToCart } = useAddProductToCart();
  return (
    <Button
      className="w-full cursor-pointer"
      variant={"outline"}
      size="lg"
      onClick={() =>
        addProductToCart({ product: productVariant, quantity: quantity })
      }
      // disabled={isPending}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Adicionar ao carrinho
    </Button>
  );
};

export { AddProductToCartButton };
