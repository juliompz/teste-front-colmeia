import { PageContainer } from "@/components/@shared/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CreditCard, Link, MapPin, Package } from "lucide-react";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const pedido = {
  numero: "#12345",
  produtos: [
    {
      id: 1,
      nome: "Shorts Active",
      cor: "Preto",
      quantidade: 1,
      preco: 69.99,
      imagem: "/black-shorts.png",
    },
    {
      id: 2,
      nome: "Mochila",
      cor: "Preta",
      quantidade: 1,
      preco: 129.99,
      imagem: "/black-backpack.png",
    },
  ],
  total: 199.98,
  pagamento: "Cartão de Crédito",
  endereco: "Quadra 20, Morada Nova, Teresina, PI",
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <PageContainer>
      <Card className="mb-6">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            Compra efetuada com sucesso!
          </h1>
          <p className="text-muted-foreground mb-1">
            Obrigado pela sua compra. Seu pedido foi confirmado.
          </p>
          <p className="text-sm text-muted-foreground">
            Número do pedido:{" "}
            <span className="font-semibold text-foreground">#{id}</span>
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Page;
