import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const TabPix = () => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <div className="flex flex-col">
      {confirmed ? (
        <ShowQrCodeContent />
      ) : (
        <ShowBlurredQrCode handleConfirm={handleConfirm} />
      )}
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
      <Button onClick={handleConfirm}>Finalizar compra</Button>
    </div>
  );
};

const ShowQrCodeContent = () => {
  const [pixCopied, setPixCopied] = useState(false);
  const handleCopyPix = () => {
    navigator.clipboard.writeText(
      "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540589.965802BR5913Nome Completo6009SAO PAULO62070503***6304ABCD"
    );
    setPixCopied(true);
    setTimeout(() => {
      setPixCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center py-6">
      <div className="bg-white p-4 rounded-lg mb-4">
        <Image src="/images/qrCode.png" alt="PIX" width={200} height={300} />
      </div>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Escaneie o QR Code com o app do seu banco ou copie o código abaixo
      </p>
      <div className="w-full bg-muted p-3 rounded-md mb-4 break-all text-xs font-mono">
        00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540589.965802BR5913Nome
        Completo6009SAO PAULO62070503***6304ABCD
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

        <Button className="w-full ">Ja paguei</Button>
      </div>
    </div>
  );
};

export { TabPix };
