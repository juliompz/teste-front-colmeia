import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CreditCardIcon, FileText, QrCode } from "lucide-react";
import React from "react";
import { TabCreditCard } from "./tab-credit-card";
import { TabPix } from "./tab-pix";
import { TabBoleto } from "./tab-boleto";
import { useRouter } from "next/navigation";
import { useUpdatePaymentMethodCheckout } from "@/hooks/checkout/use-update-payment-method-checkout";
import { ICheckout, PAYMENT_METHOD_ENUM } from "@/@types/ICheckout";
import { toast } from "sonner";
import { useFinishCheckout } from "@/hooks/checkout/use-finish-checkout";

const TabsPaymentMethods = ({ checkout }: { checkout: ICheckout }) => {
  const { mutateAsync: updatePaymentMethod } = useUpdatePaymentMethodCheckout();
  const { mutateAsync: finishCheckout } = useFinishCheckout();
  const emptyAddress = checkout.deliveryAddress === null;
  const handleFinishPurchase = async (paymentMethod: PAYMENT_METHOD_ENUM) => {
    if (emptyAddress) {
      toast.error("Selecione um endereço de entrega!", {
        duration: 3000,
        icon: <AlertTriangle className="text-red-500" />,
      });
      return;
    }
    await updatePaymentMethod({
      checkoutId: checkout.id,
      paymentMethod,
    });
    await finishCheckout(checkout.id);
  };

  if (emptyAddress)
    return (
      <div className="flex justify-center items-center">
        <p className="text-muted-foreground text-sm">
          Selecione um endereço de entrega para finalizar o pedido
        </p>
      </div>
    );

  return (
    <Tabs
      className="flex flex-col md:flex-row gap-4"
      defaultValue="credit_card"
    >
      <TabsList className="h-full flex flex-row md:flex-col p-0">
        <TabsTrigger
          disabled={emptyAddress}
          value="credit_card"
          className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3"
        >
          <CreditCardIcon />
          Cartão de Crédito
        </TabsTrigger>
        <TabsTrigger
          disabled={emptyAddress}
          value="pix"
          className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3"
        >
          <QrCode />
          PIX
        </TabsTrigger>
        <TabsTrigger
          disabled={emptyAddress}
          value="boleto"
          className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3"
        >
          <FileText />
          Boleto
        </TabsTrigger>
      </TabsList>

      <TabsContent value="credit_card">
        <TabCreditCard handleFinishPurchase={handleFinishPurchase} />
      </TabsContent>

      <TabsContent value="pix">
        <TabPix handleFinishPurchase={handleFinishPurchase} />
      </TabsContent>

      <TabsContent value="boleto">
        <TabBoleto handleFinishPurchase={handleFinishPurchase} />
      </TabsContent>
    </Tabs>
  );
};

export { TabsPaymentMethods };
