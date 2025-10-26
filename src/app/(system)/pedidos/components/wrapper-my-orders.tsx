"use client";
import {
  CHECKOUTS_KEY,
  useGetAllCheckouts,
} from "@/hooks/checkout/use-get-all-checkouts";
import React from "react";
import { OrderItem } from "./order-item";
import { Package } from "lucide-react";
import { OrderLoading } from "./order-loading";
import { ErrorWithImage } from "@/components/@shared/error-with-image";

const WrapperMyOrders = () => {
  const { data: checkouts, isLoading, isError } = useGetAllCheckouts();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Meus pedidos</h1>
        <OrderLoading />
      </div>
    );
  }
  if (isError)
    return (
      <ErrorWithImage
        refetchQueries={CHECKOUTS_KEY}
        title="Não foi possível carregar os pedidos"
      />
    );
  if (checkouts?.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Meus pedidos</h1>

        <div className="flex flex-col items-center justify-center gap-4 px-5 py-12">
          <Package className="h-16 w-16 text-muted-foreground" />

          <p className="text-center text-sm font-medium">
            Você ainda não fez nenhum pedido :(
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Meus pedidos</h1>
      <div className="space-y-6">
        {checkouts?.map((checkout) => (
          <OrderItem
            key={checkout.id}
            id={checkout.id}
            date={checkout.updatedAt}
            items={checkout.items}
            paymentMethod={checkout.paymentMethod ?? "NONE"}
            status={checkout.status}
            totalPriceInCents={checkout.totalPriceInCents}
          />
        ))}
      </div>
    </div>
  );
};

export { WrapperMyOrders };
