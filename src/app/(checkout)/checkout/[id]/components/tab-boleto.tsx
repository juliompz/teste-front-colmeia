import { PAYMENT_METHOD_ENUM } from "@/@types/ICheckout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface TabBoletoProps {
  handleFinishPurchase: (paymentMethod: PAYMENT_METHOD_ENUM) => void;
}

const TabBoleto = ({ handleFinishPurchase }: TabBoletoProps) => {
  const [showBoletoInfo, setShowBoletoInfo] = useState(false);

  const handleGerarBoleto = () => {
    setShowBoletoInfo(true);
  };
  return (
    <div className="flex md:justify-center">
      {showBoletoInfo ? (
        <ShowBoletoInfo handleFinishPurchase={handleFinishPurchase} />
      ) : (
        <div>
          <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium mb-2">
                  Pagamento via Boleto Bancário
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• O boleto será gerado após a confirmação do pedido</li>
                  <li>• Prazo de vencimento: 3 dias úteis</li>
                  <li>• Aprovação em até 2 dias úteis após o pagamento</li>
                  <li>• Você receberá o boleto por e-mail</li>
                </ul>
              </div>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mt-6">Gerar boleto</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gerar boleto</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Gerar boleto para pagamento.
              </DialogDescription>
              <DialogFooter>
                <Button onClick={handleGerarBoleto} className="cursor-pointer">
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

const ShowBoletoInfo = ({ handleFinishPurchase }: TabBoletoProps) => {
  return (
    <div>
      <p className="text-lg text-center mb-4">Boleto gerado com sucesso</p>
      <Card className="p-3">
        <div className="space-y-4">
          <h2 className="text-sm text-muted-foreground mb-2">
            Número do pedido
          </h2>
          <p className="text-3xl font-bold">1480470513078061</p>

          <div className="space-y-3">
            <p>
              Utilize este código de barras e pague o boleto pelo celular ;)
            </p>
            <Image
              src="/images/barcode.png"
              alt="codigo de barras"
              width={0}
              height={0}
              className="w-full"
              sizes="90vw"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => handleFinishPurchase(PAYMENT_METHOD_ENUM.BOLETO)}
          >
            Ja paguei
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { TabBoleto };
