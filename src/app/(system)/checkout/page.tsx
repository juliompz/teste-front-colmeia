import { PageContainer } from "@/components/@shared/page-container/page-container";
import React from "react";

import { ResumeItemsCheckout } from "./components/resume-items-checkout";

const Page = () => {
  return (
    <PageContainer>
      <div className="flex flex-row gap-4">
        <div className="md:w-[70%]">
          <ResumeItemsCheckout />
        </div>
        <div className="md:w-[30%]"></div>
      </div>
    </PageContainer>
  );
};

export default Page;
