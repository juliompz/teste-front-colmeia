import { PageContainer } from "@/components/@shared/page-container";
import React from "react";

import { ResumeItemsCheckout } from "./components/resume-items-checkout";
import { CheckoutAddress } from "./components/checkout-address";

interface CheckoutPageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: CheckoutPageProps) => {
  const checkoutId = params.id;
  return (
    <PageContainer>
      <div className="flex flex-col gap-4 md:flex-row-reverse">
        <div className="md:w-[30%]">
          <CheckoutAddress />
        </div>
        <div className="md:w-[70%]">
          <ResumeItemsCheckout checkoutId={checkoutId} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Page;
