"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import React from "react";
import { ResumeOrder } from "./resume-order";
import {
  PRODUCTS_CHECKOUT_KEY,
  useGetCheckoutById,
} from "@/hooks/checkout/use-get-checkout-by-id";
import { LoadingSkeleton } from "./loading-skeleton";
import { AlertErrorWithReload } from "@/components/@shared/alert-error-with-reload";
import { CHECKOUT_STATUS_ENUM, ICheckout } from "@/@types/ICheckout";
import { ReturnToCheckout } from "./return-to-checkout";
import { Button } from "@/components/ui/button";
import { useCreateCheckout } from "@/hooks/checkout/use-create-checkout";
import { useRouter } from "next/navigation";

const WrapperResumeOrder = ({ id }: { id: string }) => {
  const { push } = useRouter();
  const { data: order, isLoading, isError } = useGetCheckoutById(id);
  const { mutateAsync: createCheckout, isPending } = useCreateCheckout();
  if (order?.status === CHECKOUT_STATUS_ENUM.PENDENTE) {
    return <ReturnToCheckout checkoutId={id} />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return (
      <div className="flex flex-col gap-4 p-4 h-[30vh] justify-center">
        <AlertErrorWithReload refetchQueryKey={PRODUCTS_CHECKOUT_KEY(id)} />
      </div>
    );
  }

  const handleTryBuyAgain = async () => {
    if (!order) return;
    const response = await createCheckout({
      items: order.items,
      status: CHECKOUT_STATUS_ENUM.PENDENTE,
    });

    push(`/checkout/${response.id}`);
  };

  const contentByStatus = {
    [CHECKOUT_STATUS_ENUM.CONCLUIDO]: {
      title: "Pedido Concluído",
      description: "Seu pedido foi concluído e está aguardando confirmação.",
      icon: {
        name: CheckCircle2,
        color: "text-green-600",
      },
    },
    [CHECKOUT_STATUS_ENUM.CANCELADO]: {
      title: "Pedido Cancelado",
      description: "Este pedido foi cancelado e não está mais ativo.",
      icon: {
        name: XCircle,
        color: "text-red-500",
      },
    },
  } as const;

  const content =
    contentByStatus[order?.status ?? CHECKOUT_STATUS_ENUM.CONCLUIDO];

  return (
    <Card className="mb-6">
      <CardContent className="pt-8 pb-8 text-center">
        <div className="flex justify-center mb-4">
          <content.icon.name className={`h-16 w-16 ${content.icon.color}`} />
        </div>
        <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
        <p className="text-muted-foreground mb-1">{content.description}</p>
        <p className="text-sm text-muted-foreground">
          Número do pedido:{" "}
          <span className="font-semibold text-foreground">#{id}</span>
        </p>

        <div className="flex justify-center mt-2">
          <Button
            variant={"outline"}
            onClick={handleTryBuyAgain}
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            Comprar novamente
          </Button>
        </div>
      </CardContent>
      <ResumeOrder order={order ?? ({} as ICheckout)} />
    </Card>
  );
};

export { WrapperResumeOrder };
