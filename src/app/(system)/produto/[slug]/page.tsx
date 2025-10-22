import { mockProducts } from "@/utils/mock-data";
import Image from "next/image";
import { VariantSelector } from "./components/variant-selector";
import { PageContainer } from "@/components/@shared/page-container/page-container";
import { formatMoneyBrl } from "@/utils/format-money-brl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { ProductActions } from "./components/product-actions";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const produtos = mockProducts.flatMap((product) => {
    return product.variants.map((variant) => ({
      ...variant,
    }));
  });

  const produto = produtos.find((product) => product.slug === slug);

  const otherVariants = produtos.filter(
    (product) => product.productId === produto?.productId
  );

  return (
    <PageContainer>
      <div className="flex flex-col space-y-6 md:flex-row space-x-6">
        <div className="w-full md:w-1/2">
          <Image
            src={produto?.imageUrl ?? ""}
            alt={produto?.name ?? ""}
            sizes="100vw"
            height={0}
            width={0}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-8">
          <VariantSelector
            selectedVariantSlug={produto?.slug ?? ""}
            variants={otherVariants}
          />

          <div className="space-y-4 ">
            <div>
              <h1 className="text-2xl font-bold">Mochila ergometrica</h1>
              <h3 className="text-muted-foreground text-sm">
                variação: {produto?.name}
              </h3>

              <p className="text-shadow-amber-600 my-2">
                Mochila resistente e confortável, ideal para o dia a dia e
                viagens.
              </p>

              <p className="text-3xl font-semibold mt-3">
                {formatMoneyBrl(produto?.priceInCents ?? 0)}
              </p>
            </div>

            <ProductActions productVariantId={produto?.id ?? 0} />
          </div>
        </div>

        {/* 



        <ProductList title="Talvez você goste" products={likelyProducts} />

       */}
      </div>
    </PageContainer>
  );
};

export default ProductVariantPage;
