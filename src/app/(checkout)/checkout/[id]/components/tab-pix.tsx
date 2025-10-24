import { PAYMENT_METHOD_ENUM } from "@/@types/ICheckout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Countdown from "react-countdown";

interface TabPixProps {
  handleFinishPurchase: (paymentMethod: PAYMENT_METHOD_ENUM) => void;
}

const TabPix = ({ handleFinishPurchase }: TabPixProps) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <div className="flex flex-col">
      {confirmed && (
        <ShowQrCodeContent handleFinishPurchase={handleFinishPurchase} />
      )}
      {!confirmed && <ShowBlurredQrCode handleConfirm={handleConfirm} />}
    </div>
  );
};

const ShowBlurredQrCode = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  return (
    <div className="flex flex-col space-y-2 justify-center items-center w-full">
      <p className="text-sm font-medium mb-1 text-center">Pagar com PIX</p>
      <Image
        src="/images/qrCode.png"
        className="blur-sm"
        alt="PIX"
        width={200}
        height={300}
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Gerar codigo PIX</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerar código PIX</DialogTitle>
            <DialogDescription>
              Gere um código PIX para pagamento em um banco. Você terá 5 minutos
              para efetuar o pagamento.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleConfirm} className="cursor-pointer">
              Gerar código
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ShowQrCodeContent = ({ handleFinishPurchase }: TabPixProps) => {
  const textCode =
    "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540589.965802BR5913Nome Completo6009SAO PAULO62070503***6304ABCD";

  const [pixCopied, setPixCopied] = useState(false);
  const handleCopyPix = () => {
    navigator.clipboard.writeText(textCode);
    setPixCopied(true);
    setTimeout(() => {
      setPixCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center py-6">
      <div className="flex flex-col items-center ">
        <Countdown
          date={Date.now() + 1000 * 60 * 5} // 5 minutos
          className="text-3xl"
          autoStart
          count={100000}
          zeroPadTime={2}
          daysInHours
          // onComplete={}
        />
        <p className="text-sm text-muted-foreground text-center mb-4">
          Você tem 5 minutos para efetuar o pagamento
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg mb-4">
        <Image src="/images/qrCode.png" alt="PIX" width={200} height={300} />
      </div>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Escaneie o QR Code com o app do seu banco ou copie o código abaixo
      </p>
      <div className="w-full bg-muted p-3 rounded-md mb-4 break-all text-xs font-mono">
        {textCode}
      </div>
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={handleCopyPix}
        >
          {pixCopied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Código Copiado!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copiar Código PIX
            </>
          )}
        </Button>

        <Button
          className="w-full"
          onClick={() => handleFinishPurchase(PAYMENT_METHOD_ENUM.PIX)}
        >
          Ja paguei
        </Button>
      </div>
    </div>
  );
};

export { TabPix };
