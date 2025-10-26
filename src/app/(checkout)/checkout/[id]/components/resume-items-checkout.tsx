"use client";
import { CHECKOUT_STATUS_ENUM, ICheckout } from "@/@types/ICheckout";
import { AlertErrorWithReload } from "@/components/@shared/alert-error-with-reload";
import { CartItem } from "@/components/@shared/header/cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCTS_CART_KEY } from "@/hooks/cart/use-get-product-cart";
import { useFinishCheckout } from "@/hooks/checkout/use-finish-checkout";
import { formatMoneyBrl } from "@/utils/masks/format-money-brl";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loader2 } from "lucide-react";
import { TabsPaymentMethods } from "./tabs-payment-methods";

interface ResumeItemsCheckoutProps {
  checkoutData: ICheckout | null;
  isErrorCheckout: boolean;
  isLoadingCheckout: boolean;
}

const ResumeItemsCheckout = ({
  checkoutData,
  isErrorCheckout,
  isLoadingCheckout,
}: ResumeItemsCheckoutProps) => {
  const { mutateAsync: finishCheckout, isPending } = useFinishCheckout();

  const handleCancelCheckout = () => {
    if (!checkoutData) return;
    finishCheckout({
      checkoutId: checkoutData.id,
      status: CHECKOUT_STATUS_ENUM.CANCELADO,
    });
  };

  if (isErrorCheckout) {
    return (
      <Card className="flex flex-col gap-4 p-4 h-[30vh] justify-center">
        <AlertErrorWithReload refetchQueryKey={PRODUCTS_CART_KEY} />
      </Card>
    );
  }

  if (isPending)
    return (
      <div className="flex  gap-4 p-4 h-[30vh] justify-center">
        <div className="flex flex-col gap-4 items-center">
          <p>Aguarde, cancelando o pedido...</p>
          <Loader2 className="animate-spin h-16 w-16 text-red-500" />
        </div>
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <p>Resumo do pedido</p>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-red-300"
            onClick={handleCancelCheckout}
          >
            Cancelar compra
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full">
          <p className=" text-sm font-medium mb-1">Itens do carrinho</p>
          <div className="flex h-full flex-col gap-8">
            {isLoadingCheckout && (
              <div className="flex h-full flex-col gap-8">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className=" h-16 w-full rounded-lg " />
                ))}
              </div>
            )}
            {checkoutData?.items.map((item) => (
              <CartItem
                disableActions
                key={item.id}
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

        <div className="mt-12 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-md ">Frete</p>
            <p className="text-md ">GRÁTIS!</p>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-md font-bold">Total</p>
            <p className="text-md font-bold">
              {formatMoneyBrl(checkoutData?.totalPriceInCents ?? 0)}
            </p>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="space-y-3">
          <div>
            <p className="text-md font-bold">Forma de pagamento</p>
            <p className="text-sm font-normal">Como você deseja pagar?</p>
          </div>
          <TabsPaymentMethods checkout={checkoutData ?? ({} as ICheckout)} />
        </div>
      </CardContent>
    </Card>
  );
};

export { ResumeItemsCheckout };
