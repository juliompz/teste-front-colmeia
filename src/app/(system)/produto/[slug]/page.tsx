import { PageContainer } from "@/components/@shared/page-container";

import { Wrapper } from "./components/wrapper";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  return (
    <PageContainer>
      <Wrapper slug={slug} />
    </PageContainer>
  );
};

export default ProductVariantPage;
