import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCardIcon, FileText, Loader2, QrCode } from "lucide-react";
import React from "react";
import { useUpdatePaymentMethodCheckout } from "@/hooks/checkout/use-update-payment-method-checkout";
import {
  CHECKOUT_STATUS_ENUM,
  ICheckout,
  PAYMENT_METHOD_ENUM,
} from "@/@types/ICheckout";
import { useFinishCheckout } from "@/hooks/checkout/use-finish-checkout";
import dynamic from "next/dynamic";

const DynamicLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="animate-spin h-6 w-6" />
    </div>
  );
};

const DynamicTabBoleto = dynamic(
  () => import("./tab-boleto").then((mod) => mod.TabBoleto),
  {
    ssr: false,
    loading: () => <DynamicLoading />,
  }
);

const DynamicTabCreditCard = dynamic(
  () => import("./tab-credit-card").then((mod) => mod.TabCreditCard),
  {
    ssr: false,
    loading: () => <DynamicLoading />,
  }
);

const DynamicTabPix = dynamic(
  () => import("./tab-pix").then((mod) => mod.TabPix),
  {
    ssr: false,
    loading: () => <DynamicLoading />,
  }
);

const TabsPaymentMethods = ({ checkout }: { checkout: ICheckout }) => {
  const { mutateAsync: updatePaymentMethod } = useUpdatePaymentMethodCheckout();
  const { mutateAsync: finishCheckout, isPending: isPendingFinish } =
    useFinishCheckout();
  const emptyAddress = checkout.deliveryAddress === null;

  const handleFinishPurchase = async (
    paymentMethod: PAYMENT_METHOD_ENUM,
    status: CHECKOUT_STATUS_ENUM
  ) => {
    await updatePaymentMethod({
      checkoutId: checkout.id,
      paymentMethod,
    });

    await finishCheckout({
      checkoutId: checkout.id,
      createdByCart: checkout.createdByCart,
      status: status,
    });
  };

  if (emptyAddress)
    return (
      <div className="flex justify-center items-center py-20">
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
      <TabsList className="h-full flex flex-row md:flex-col p-1">
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
        <DynamicTabCreditCard
          handleFinishPurchase={handleFinishPurchase}
          isPendingFinish={isPendingFinish}
        />
      </TabsContent>

      <TabsContent value="pix">
        <DynamicTabPix
          handleFinishPurchase={handleFinishPurchase}
          isPendingFinish={isPendingFinish}
        />
      </TabsContent>

      <TabsContent value="boleto">
        <DynamicTabBoleto
          handleFinishPurchase={handleFinishPurchase}
          isPendingFinish={isPendingFinish}
        />
      </TabsContent>
    </Tabs>
  );
};

export { TabsPaymentMethods };
