import { PageContainer } from "@/components/@shared/page-container";
import React from "react";

import { ResumeItemsCheckout } from "./components/resume-items-checkout";
import { CheckoutAddress } from "./components/checkout-address";

interface CheckoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: CheckoutPageProps) => {
  const { id } = await params;
  return (
    <PageContainer>
      <div className="flex flex-col gap-4 md:flex-row-reverse">
        <div className="md:w-[30%]">
          <CheckoutAddress checkoutId={id} />
        </div>
        <div className="md:w-[70%]">
          <ResumeItemsCheckout checkoutId={id} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Page;
