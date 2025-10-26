import { CHECKOUT_STATUS_ENUM, PAYMENT_METHOD_ENUM } from "@/@types/ICheckout";
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
import { FinishLoading } from "./finish-loading";

interface TabBoletoProps {
  handleFinishPurchase: (
    paymentMethod: PAYMENT_METHOD_ENUM,
    status: CHECKOUT_STATUS_ENUM
  ) => void;
  isPendingFinish: boolean;
}

const TabBoleto = ({
  handleFinishPurchase,
  isPendingFinish,
}: TabBoletoProps) => {
  const [showBoletoInfo, setShowBoletoInfo] = useState(false);
  const [loadingBoleto, setLoadingBoleto] = useState(false);

  const handleGerarBoleto = async () => {
    setLoadingBoleto(true);
    setTimeout(() => {
      setShowBoletoInfo(true);
    }, 3000);
  };

  if (isPendingFinish) {
    return <FinishLoading text="Validando boleto..." />;
  }

  return (
    <div className="flex md:justify-center py-7">
      {showBoletoInfo ? (
        <ShowBoletoInfo
          handleFinishPurchase={handleFinishPurchase}
          isPendingFinish
        />
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
              <Button className="w-full mt-6 cursor-pointer">
                Gerar boleto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gerar boleto</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Gerar boleto para pagamento.
              </DialogDescription>
              {loadingBoleto && (
                <FinishLoading text="Gerando boleto, aguarde um instante..." />
              )}
              <DialogFooter>
                <Button
                  onClick={handleGerarBoleto}
                  className="cursor-pointer"
                  disabled={loadingBoleto}
                >
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
            onClick={() =>
              handleFinishPurchase(
                PAYMENT_METHOD_ENUM.BOLETO,
                CHECKOUT_STATUS_ENUM.CONCLUIDO
              )
            }
          >
            Ja paguei
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { TabBoleto };
