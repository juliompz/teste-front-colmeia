"use client";
import { CartItem } from "@/components/@shared/header/cart-item";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatMoneyBrl } from "@/utils/format-money-brl";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";
import { TabsPaymentMethods } from "./tabs-payment-methods";
import {
  PRODUCTS_CART_KEY,
  useGetProductsCart,
} from "@/hooks/cart/use-get-product-cart";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertErrorWithReload } from "@/components/@shared/alert-error-with-reload";
import { useGetCheckoutById } from "@/hooks/checkout/use-get-checkout-by-id";

interface ResumeItemsCheckoutProps {
  checkoutId: string;
}

const ResumeItemsCheckout = ({ checkoutId }: ResumeItemsCheckoutProps) => {
  const {
    data: productsCheckout,
    isLoading,
    isError,
  } = useGetCheckoutById(checkoutId);

  if (isError) {
    return (
      <Card className="flex flex-col gap-4 p-4 h-[30vh] justify-center">
        <AlertErrorWithReload refetchQueryKey={PRODUCTS_CART_KEY} />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>Finalizando a compra</CardHeader>
      <CardContent>
        <ScrollArea className="h-full">
          <p className=" text-sm font-medium mb-1">Itens do carrinho</p>
          <div className="flex h-full flex-col gap-8">
            {isLoading && (
              <div className="flex h-full flex-col gap-8">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className=" h-16 w-full rounded-lg " />
                ))}
              </div>
            )}
            {productsCheckout?.items.map((item) => (
              <CartItem
                disableActions
                key={item.id}
                id={item.id}
                productVariantId={item.productVariant.id}
                productName={item.productVariant.productName}
                productVariantName={item.productVariant.name}
                productVariantImageUrl={item.productVariant.imageUrl}
                productVariantPriceInCents={item.productVariant.priceInCents}
                quantity={item.quantity}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between my-6">
          <p className="text-md font-bold">Total</p>
          <p className="text-md font-bold">
            {formatMoneyBrl(productsCheckout?.totalPriceInCents ?? 0)}
          </p>
        </div>
        <Separator className="my-2" />

        <div className="space-y-3">
          <div>
            <p className="text-md font-bold">Forma de pagamento</p>
            <p className="text-sm font-normal">Como você deseja pagar?</p>
          </div>
          <TabsPaymentMethods />
        </div>
      </CardContent>
    </Card>
  );
};

export { ResumeItemsCheckout };
