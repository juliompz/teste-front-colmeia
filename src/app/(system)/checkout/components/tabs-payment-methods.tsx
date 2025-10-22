import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCardIcon, FileText, QrCode } from "lucide-react";
import React from "react";
import { CreditCard } from "../../../../components/ui/credit-card";
import { TabCreditCard } from "./tab-credit-card";

const TabsPaymentMethods = () => {
  return (
    <Tabs
      className="flex flex-col md:flex-row gap-4"
      defaultValue="credit_card"
    >
      <TabsList className="h-full flex flex-row md:flex-col p-0">
        <TabsTrigger
          value="credit_card"
          className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3"
        >
          <CreditCardIcon />
          Cartão de Crédito
        </TabsTrigger>
        <TabsTrigger
          value="pix"
          className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3"
        >
          <QrCode />
          PIX
        </TabsTrigger>
        <TabsTrigger
          value="boleto"
          className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3"
        >
          <FileText />
          Boleto
        </TabsTrigger>
      </TabsList>

      <TabsContent value="credit_card" className="flex md:justify-center">
        <TabCreditCard />
      </TabsContent>
    </Tabs>
  );
};

export { TabsPaymentMethods };
