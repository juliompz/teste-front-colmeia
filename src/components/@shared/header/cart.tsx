"use client";

import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
// import { useCart } from "@/hooks/queries/use-cart";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItem from "./cart-item";
import { cart } from "@/utils/mock-data";
import { formatMoneyBrl } from "@/utils/format-money-brl";

export const Cart = () => {
  const userIsLogado = 0;
  // const { data: cart } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        {userIsLogado ? <CartContentItems /> : <NotUserLoggedIn />}
      </SheetContent>
    </Sheet>
  );
};

const CartContentItems = () => {
  return (
    <div className="flex h-full flex-col px-5 pb-5">
      <div className="flex h-full max-h-full flex-col overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {cart?.items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                productVariantId={item.productVariant.id}
                // productName={item.productVariant.product.name}
                productName={item.productVariant.name}
                productVariantName={item.productVariant.name}
                productVariantImageUrl={item.productVariant.imageUrl}
                productVariantPriceInCents={item.productVariant.priceInCents}
                quantity={item.quantity}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {cart?.items && cart?.items.length > 0 && (
        <div className="flex flex-col gap-4">
          <Separator />

          <div className="flex items-center justify-between text-xs font-medium">
            <p>Subtotal</p>
            <p>{formatMoneyBrl(cart?.totalPriceInCents ?? 0)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs font-medium">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs font-medium">
            <p>Total</p>
            <p>{formatMoneyBrl(cart?.totalPriceInCents ?? 0)}</p>
          </div>

          <Button className="mt-5 rounded-full" asChild>
            <Link href="/cart/identification">Finalizar compra</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

const NotUserLoggedIn = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-5 py-12">
      <p className="text-center text-sm font-medium">
        Você precisa estar autenticado para acessar o carrinho :)
      </p>
      <Button className="mt-5 w-full" asChild>
        <Link href="/autenticar">Entrar</Link>
      </Button>
    </div>
  );
};
