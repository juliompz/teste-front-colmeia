import { PageContainer } from "@/components/@shared/page-container";

import React from "react";
import { WrapperResumeOrder } from "./components/wrapper-resume-order";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <PageContainer>
      <WrapperResumeOrder id={id} />
    </PageContainer>
  );
};

export default Page;
