import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const TabBoleto = () => {
  const [showBoletoInfo, setShowBoletoInfo] = useState(false);

  const handleGerarBoleto = () => {
    setShowBoletoInfo(true);
  };
  return (
    <div>
      {showBoletoInfo ? (
        <ShowBoletoInfo />
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
          <Button className="w-full mt-6" onClick={handleGerarBoleto}>
            Gerar Boleto
          </Button>
        </div>
      )}
    </div>
  );
};

const ShowBoletoInfo = () => {
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
          <Button>Ja paguei</Button>
        </div>
      </Card>
    </div>
  );
};

export { TabBoleto };
