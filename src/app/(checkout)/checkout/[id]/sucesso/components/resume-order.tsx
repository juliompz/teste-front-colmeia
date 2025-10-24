"use client";
import { IAddress } from "@/@types/IAddress";
import { PAYMENT_METHOD_ENUM } from "@/@types/ICheckout";
import { AlertErrorWithReload } from "@/components/@shared/alert-error-with-reload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PRODUCTS_CHECKOUT_KEY,
  useGetCheckoutById,
} from "@/hooks/checkout/use-get-checkout-by-id";
import { formatAddress } from "@/utils/format-address";
import { formatMoneyBrl } from "@/utils/format-money-brl";
import { CreditCard, MapPin, Package } from "lucide-react";
import React from "react";
import { LoadingSkeleton } from "./loading-skeleton";
import Link from "next/link";
import { CartItem } from "@/components/@shared/header/cart-item";
import { Separator } from "@/components/ui/separator";

const ResumeOrder = ({ id }: { id: string }) => {
  const { data: order, isLoading, isError } = useGetCheckoutById(id);

  const paymentMethodLabel = {
    [PAYMENT_METHOD_ENUM.PIX]: "Pagamento via PIX",
    [PAYMENT_METHOD_ENUM.CREDIT_CARD]: "Pagamento via Cartão de Crédito",
    [PAYMENT_METHOD_ENUM.BOLETO]: "Pagamento via Boleto",
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-4 p-4 h-[30vh] justify-center">
        <AlertErrorWithReload refetchQueryKey={PRODUCTS_CHECKOUT_KEY(id)} />
      </div>
    );
  }

  return (
    <Card className="mx-2">
      <CardContent className="pt-6 pb-6">
        <h2 className="text-xl font-bold mb-6">Resumo do pedido</h2>

        {/* Produtos */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5" />
            <h3 className="font-semibold">Itens do pedido</h3>
          </div>
          <div className="space-y-4">
            {order?.items.map((item) => (
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
          <div className="space-y-3">
            <Separator className="my-2" />
            <div className=" flex justify-between items-center">
              <span className="font-md">Frete</span>
              <span className="text-xl">GRÁTIS</span>
            </div>
            <div className=" flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="text-xl font-bold">
                {formatMoneyBrl(order?.totalPriceInCents ?? 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Forma de Pagamento */}
        <div className="mb-6 pb-6 border-b">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-5 w-5" />
            <h3 className="font-semibold">Forma de pagamento</h3>
          </div>
          <p className="text-muted-foreground">
            {
              paymentMethodLabel[
                order?.paymentMethod ?? PAYMENT_METHOD_ENUM.PIX
              ]
            }
          </p>
        </div>

        {/* Endereço de Entrega */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5" />
            <h3 className="font-semibold">Endereço de entrega</h3>
          </div>
          <p className="text-muted-foreground">
            {formatAddress(order?.deliveryAddress ?? ({} as IAddress))}
          </p>
        </div>

        {/* Botão de Ação */}
        <div className="flex gap-3">
          <Button asChild className="flex-1">
            <Link href="/">Continuar comprando</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
            <Link href="/pedidos">Ver meus pedidos</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ResumeOrder };
