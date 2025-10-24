import { PageContainer } from "@/components/@shared/page-container";
import React from "react";

import { WrapperCheckout } from "./components/wrapper-checkout";

interface CheckoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: CheckoutPageProps) => {
  const { id } = await params;
  return (
    <PageContainer>
      <WrapperCheckout checkoutId={id} />
    </PageContainer>
  );
};

export default Page;
