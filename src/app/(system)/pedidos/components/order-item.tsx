import { ICartItem } from "@/@types/ICart";
import { CHECKOUT_STATUS_ENUM, PAYMENT_METHOD_ENUM } from "@/@types/ICheckout";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/utils/masks/format-date";
import { formatMoneyBrl } from "@/utils/masks/format-money-brl";
import { Calendar, CreditCard, FileText, Package, QrCode } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface OrderItemProps {
  date: string;
  id: string;
  items: ICartItem[];
  paymentMethod: PAYMENT_METHOD_ENUM | "NONE";
  status: CHECKOUT_STATUS_ENUM;
  totalPriceInCents: number;
}

const OrderItem = ({
  date,
  id,
  items,
  paymentMethod,
  status,
  totalPriceInCents,
}: OrderItemProps) => {
  const { push } = useRouter();

  const paymentMethodContent = {
    [PAYMENT_METHOD_ENUM.PIX]: {
      label: "Pix",
      icon: QrCode,
    },
    [PAYMENT_METHOD_ENUM.CREDIT_CARD]: {
      label: "Cartão de crédito",
      icon: CreditCard,
    },
    [PAYMENT_METHOD_ENUM.BOLETO]: {
      label: "Boleto",
      icon: FileText,
    },
    NONE: {
      label: "Pagamento não efetuado",
      icon: CreditCard,
    },
  };

  const statusColor = {
    [CHECKOUT_STATUS_ENUM.PENDENTE]: "bg-orange-300",
    [CHECKOUT_STATUS_ENUM.CONCLUIDO]: "bg-green-500",
    [CHECKOUT_STATUS_ENUM.CANCELADO]: "bg-red-500",
  };

  const paymentContent = paymentMethodContent[paymentMethod];

  return (
    <Card
      className="overflow-hidden cursor-pointer"
      onClick={() => push(`/checkout/${id}`)}
    >
      {/* Order Header */}
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Pedido #{id}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {formatDate(date)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <paymentContent.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {paymentContent.label}
              </span>
            </div>
          </div>
          <Badge className={statusColor[status]}>{status}</Badge>
        </div>
      </CardHeader>

      {/* Order Items */}
      <div className="px-4 py-3">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Itens do pedido
        </h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.productVariant.imageUrl || "/placeholder.svg"}
                    alt={item.productVariant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-foreground">
                    {item.productVariant.productName}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.productVariant.name} • {item.quantity}{" "}
                    {item.quantity === 1 ? "item" : "itens"}
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <p className="text-sm font-semibold text-foreground">
                  {formatMoneyBrl(item.productVariant.priceInCents)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order totalPriceInCents */}
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-lg font-bold text-foreground">
            {formatMoneyBrl(totalPriceInCents)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export { OrderItem };
