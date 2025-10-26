import { PageContainer } from "@/components/@shared/page-container";

import { WrapperProduct } from "./components/wrapper-product";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  return (
    <PageContainer>
      <WrapperProduct slug={slug} />
    </PageContainer>
  );
};

export default ProductVariantPage;
