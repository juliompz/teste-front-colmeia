"use client";

import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AddProductToCartButton } from "../add-product-cart-button";
import { IProductVariant } from "@/@types/IProduct";
import { useCheckoutStore } from "@/zustand/checkout-store";
import { useRouter } from "next/navigation";
import { useCreateCheckout } from "@/hooks/checkout/use-create-checkout";
import { CHECKOUT_STATUS_ENUM } from "@/@types/ICheckout";

// import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariant: IProductVariant;
}

const ProductActions = ({ productVariant }: ProductActionsProps) => {
  const { push } = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { mutateAsync: createCheckout } = useCreateCheckout();

  const handleBuyNow = async () => {
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
        <AddProductToCartButton
          productVariant={productVariant}
          quantity={quantity}
        />
        <Button
          className="rounded-full cursor-pointer"
          size="lg"
          onClick={handleBuyNow}
        >
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export { ProductActions };
