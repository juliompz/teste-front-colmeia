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
import { useCartStore } from "@/zustand/cart-store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";
import { TabsPaymentMethods } from "./tabs-payment-methods";

const ResumeItemsCheckout = () => {
  const { items, totalPriceInCents } = useCartStore();

  return (
    <Card>
      <CardHeader>Finalizando a compra</CardHeader>
      <CardContent>
        <ScrollArea className="h-full">
          <p className=" text-sm font-medium mb-1">Itens do carrinho</p>
          <div className="flex h-full flex-col gap-8">
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                productVariantId={item.productVariant.id}
                productName={item.productVariant.name}
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
            {formatMoneyBrl(totalPriceInCents)}
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
