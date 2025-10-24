"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCheckoutById } from "@/hooks/checkout/use-get-checkout-by-id";
import { formatMoneyBrl } from "@/utils/format-money-brl";
import { Link, Package } from "lucide-react";
import React from "react";

const ResumeOrder = ({ id }: { id: string }) => {
  const { data: order } = useGetCheckoutById(id);
  return (
    <Card>
      <CardContent className="pt-6 pb-6">
        <h2 className="text-xl font-bold mb-6">Resumo do pedido</h2>

        {/* Produtos */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5" />
            <h3 className="font-semibold">Itens do pedido</h3>
          </div>
          <div className="space-y-4">
            {order?.items.map((product) => (
              <div key={product.id} className="flex items-start gap-4">
                <img
                  src={product.productVariant.imageUrl || "/placeholder.svg"}
                  alt={product.productVariant.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">
                    {product.productVariant.productName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {product.productVariant.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {product.quantity} itens
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatMoneyBrl(product.productVariant.priceInCents)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="font-bold">Total</span>
            <span className="text-xl font-bold">
              {formatMoneyBrl(order?.totalPriceInCents ?? 0)}
            </span>
          </div>
        </div>

        {/* Forma de Pagamento */}
        {/* <div className="mb-6 pb-6 border-b">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-5 w-5" />
            <h3 className="font-semibold">Forma de pagamento</h3>
          </div>
          <p className="text-muted-foreground">{pedido.pagamento}</p>
        </div> */}

        {/* Endereço de Entrega */}
        {/* <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5" />
            <h3 className="font-semibold">Endereço de entrega</h3>
          </div>
          <p className="text-muted-foreground">{pedido.endereco}</p>
        </div> */}

        {/* Botão de Ação */}
        <div className="flex gap-3">
          <Button asChild className="flex-1">
            <Link href="/">Continuar comprando</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
            <Link href="/pedidos">Ver meus pedidos</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ResumeOrder };
