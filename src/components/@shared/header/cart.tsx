"use client";

import { LogOut, ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartItem } from "./cart-item";
import { formatMoneyBrl } from "@/utils/format-money-brl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/zustand/auth-storage";
import { IUser } from "@/@types/IUser";
import { useCartStore } from "@/zustand/cart-storage";

export const Cart = () => {
  const { user, logout } = useAuthStore();

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
        {user?.id ? (
          <CartContentItems user={user} logout={logout} />
        ) : (
          <NotUserLoggedIn />
        )}
      </SheetContent>
    </Sheet>
  );
};

const CartContentItems = ({
  user,
  logout,
}: {
  user: IUser;
  logout: () => void;
}) => {
  const { items, totalPriceInCents } = useCartStore();

  return (
    <div className="flex h-full flex-col px-5 pb-5">
      <div className="flex items-center justify-between gap-4 mb-2 ">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage alt={user?.name} />
          <AvatarFallback className="rounded-lg text-primary">
            {user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user?.name}</span>
          <span className="truncate text-xs">{user?.email}</span>
        </div>

        <Button variant={"outline"} onClick={logout}>
          <LogOut className="ml-auto size-4" />
        </Button>
      </div>
      <Separator className="my-2" />
      <div className="flex h-full max-h-full flex-col overflow-hidden">
        {!items || items.length === 0 ? (
          <p className="text-center text-sm font-medium">
            Carrinho vazio, adicione algum produto :)
          </p>
        ) : (
          <ScrollArea className="h-full">
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
        )}
      </div>
      {items && items.length > 0 && (
        <div className="flex flex-col gap-4">
          <Separator />

          <div className="flex items-center justify-between text-xs font-medium">
            <p>Subtotal</p>
            <p>{formatMoneyBrl(totalPriceInCents ?? 0)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs font-medium">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs font-medium">
            <p>Total</p>
            <p>{formatMoneyBrl(totalPriceInCents ?? 0)}</p>
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
