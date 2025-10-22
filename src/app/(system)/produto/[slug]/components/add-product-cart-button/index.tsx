"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productVariantId: number;
  quantity: number;
}

const AddProductToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["addProductToCart", productVariantId, quantity],
  //   mutationFn: () => console.log("oi"),
  //   // addProductToCart({
  //   //   productVariantId,
  //   //   quantity,
  //   // }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["cart"] });
  //   },
  // });
  return (
    <Button
      className="w-full cursor-pointer"
      variant={"outline"}
      size="lg"
      // disabled={isPending}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Adicionar ao carrinho
    </Button>
  );
};

export { AddProductToCartButton };
