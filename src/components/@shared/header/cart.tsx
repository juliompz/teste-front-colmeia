"use client";

import { LogOut, ShoppingCartIcon } from "lucide-react";
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
import { useAuthStore } from "@/zustand/auth-store";
import { IUser } from "@/@types/IUser";
import {
  PRODUCTS_CART_KEY,
  useGetProductsCart,
} from "@/hooks/cart/use-get-product-cart";
import { AlertErrorWithReload } from "../alert-error-with-reload";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useCreateCheckout } from "@/hooks/checkout/use-create-checkout";
import { toast } from "sonner";
import { CHECKOUT_STATUS_ENUM } from "@/@types/ICheckout";
import { useCartStore } from "@/zustand/cart-store";
import { Badge } from "@/components/ui/badge";

export const Cart = () => {
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  return (
    <Sheet>
      <SheetTrigger asChild className="px-2">
        <Button variant="outline">
          <ShoppingCartIcon />
          <Badge variant={"outline"}>{items.length}</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <UserSection user={user ?? null} logout={logout} />
        {user && <CartContentItems />}
      </SheetContent>
    </Sheet>
  );
};

const UserSection = ({
  user,
  logout,
}: {
  user: IUser | null;
  logout: () => void;
}) => {
  if (!user)
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

  return (
    <div className="flex items-center justify-between gap-4 mx-5 ">
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
  );
};

const CartContentItems = () => {
  const { push } = useRouter();
  const { data: productsCart, isLoading, isError } = useGetProductsCart();
  const { mutateAsync: createCheckout } = useCreateCheckout();

  const emptyCart =
    !productsCart?.products || productsCart?.products.length === 0;

  const handleCheckout = async () => {
    if (emptyCart) {
      toast.error("Selecione pelo menos um produto");
      return;
    }
    const checkout = await createCheckout({
      items: productsCart?.products,
      status: CHECKOUT_STATUS_ENUM.PENDENTE,
    });
    push(`/checkout/${checkout.id}`);
  };

  if (isLoading)
    return (
      <div className="space-y-3 mx-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className=" h-16 w-full rounded-lg " />
        ))}
      </div>
    );

  if (isError) {
    return <AlertErrorWithReload refetchQueryKey={PRODUCTS_CART_KEY} />;
  }

  return (
    <div className="flex h-full flex-col px-5 pb-5">
      <Separator className="my-2" />
      <div className="flex h-full max-h-full flex-col overflow-hidden">
        {emptyCart ? (
          <p className="text-center text-sm font-medium">
            Carrinho vazio, adicione algum produto :)
          </p>
        ) : (
          <ScrollArea className="h-full">
            <div className="flex h-full flex-col gap-8">
              {productsCart?.products.map((item) => (
                <CartItem
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
        )}
      </div>
      {productsCart?.products && productsCart?.products.length > 0 && (
        <div className="flex flex-col gap-4">
          <Separator />

          <div className="flex items-center justify-between text-xs font-medium">
            <p>Subtotal</p>
            <p>{formatMoneyBrl(productsCart?.totalPriceInCents ?? 0)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs font-medium">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs font-medium">
            <p>Total</p>
            <p>{formatMoneyBrl(productsCart?.totalPriceInCents ?? 0)}</p>
          </div>

          <Button
            className="mt-5 rounded-full"
            onClick={handleCheckout}
            disabled={emptyCart}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};
