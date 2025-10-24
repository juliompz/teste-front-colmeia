"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const ReturnToCheckout = ({ checkoutId }: { checkoutId: string }) => {
  const { push } = useRouter();
  return (
    <Card className="flex flex-col md:flex-row items-center p-8">
      <div className="shrink-0">
        <Image
          src="/images/pending-order.jpg"
          alt="Pedido pendente"
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">Pedido ainda não concluído</h2>
          <p className="mt-2 text-muted-foreground">
            Seu pedido ainda está em processamento. Por favor, aguarde a
            confirmação ou tente novamente mais tarde.
          </p>
        </div>

        <Button
          variant="outline"
          className="md:w-fit"
          onClick={() => push(`/checkout/${checkoutId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>
    </Card>
  );
};

export { ReturnToCheckout };
