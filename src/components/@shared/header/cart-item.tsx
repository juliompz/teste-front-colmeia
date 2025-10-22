import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

// import { formatCentsToBRL } from "@/helpers/money";
// import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
// import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
// import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "@/components/ui/button";
import { formatMoneyBrl } from "@/utils/format-money-brl";
import { useDeleteItemCart } from "@/hooks/cart/use-delete-item-cart";
import { useDecreaseItemCart } from "@/hooks/cart/use-decrease-item-cart";
import { useIncreaseItemCart } from "@/hooks/cart/use-increase-item-cart";

interface CartItemProps {
  id: number;
  productName: string;
  productVariantId: number;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const { mutateAsync: deleteItem } = useDeleteItemCart();
  const { mutateAsync: decreaseItem } = useDecreaseItemCart();
  const { mutateAsync: increaseItem } = useIncreaseItemCart();
  const handleDeleteClick = () => {
    deleteItem(productVariantId);
  };
  const handleDecreaseQuantityClick = async () => {
    await decreaseItem(productVariantId);
  };
  const handleIncreaseQuantityClick = () => {
    increaseItem(productVariantId);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatMoneyBrl(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export { CartItem };
