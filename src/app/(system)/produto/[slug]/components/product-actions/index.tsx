"use client";

import { Loader2, MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AddProductToCartButton } from "../add-product-cart-button";
import { IProductVariant } from "@/@types/IProduct";
import { useRouter } from "next/navigation";
import { useCreateCheckout } from "@/hooks/checkout/use-create-checkout";
import { CHECKOUT_STATUS_ENUM } from "@/@types/ICheckout";
import { useAuthStore } from "@/zustand/auth-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useAddProductToCart } from "@/hooks/cart/use-add-product-cart";

interface ProductActionsProps {
  productVariant: IProductVariant;
}

const ProductActions = ({ productVariant }: ProductActionsProps) => {
  const { user } = useAuthStore();

  const { push } = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [showUserNotAuthenticatedModal, setShowUserNotAuthenticatedModal] =
    useState(false);
  const { mutateAsync: createCheckout, isPending } = useCreateCheckout();
  const { mutateAsync: addProductToCart } = useAddProductToCart();

  const handleAddToCart = async () => {
    if (!user) {
      setShowUserNotAuthenticatedModal(true);
      return;
    }
    await addProductToCart({ product: productVariant, quantity: quantity });
  };
  const handleBuyNow = async () => {
    if (!user) {
      setShowUserNotAuthenticatedModal(true);
      return;
    }
    const checkout = await createCheckout({
      items: [
        { id: Math.ceil(Math.random() * 10), productVariant, quantity: 1 },
      ],
      status: CHECKOUT_STATUS_ENUM.PENDENTE,
    });
    push(`/checkout/${checkout.id}`);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <div className="space-y-2">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <Button
          className="w-full cursor-pointer"
          variant={"outline"}
          size="lg"
          onClick={handleAddToCart}
          disabled={isPending}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adicionar ao carrinho
        </Button>
        <Button
          className="rounded-full cursor-pointer"
          size="lg"
          onClick={handleBuyNow}
          disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          Comprar agora
        </Button>
      </div>

      <Dialog
        open={showUserNotAuthenticatedModal}
        onOpenChange={setShowUserNotAuthenticatedModal}
      >
        <DialogContent>
          <p className="text-lg font-medium">Não autenticado</p>
          <p className="text-muted-foreground text-sm">
            Para continuar, faça login ou cadastre-se.
          </p>

          <Button asChild>
            <Link href="/autenticar">Entrar</Link>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ProductActions };
