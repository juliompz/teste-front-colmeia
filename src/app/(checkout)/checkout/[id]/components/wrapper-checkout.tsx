"use client";
import React from "react";
import { CheckoutAddress } from "./checkout-address";
import { ResumeItemsCheckout } from "./resume-items-checkout";
import { useGetCheckoutById } from "@/hooks/checkout/use-get-checkout-by-id";
import { CHECKOUT_STATUS_ENUM } from "@/@types/ICheckout";
import dynamic from "next/dynamic";

const DynamicWrapperResumeOrder = dynamic(
  () =>
    import("../finalizar/components/wrapper-resume-order").then(
      (mod) => mod.WrapperResumeOrder
    ),
  { ssr: false }
);

const WrapperCheckout = ({ checkoutId }: { checkoutId: string }) => {
  const { data: checkout, isLoading, isError } = useGetCheckoutById(checkoutId);
  if (checkout?.status !== CHECKOUT_STATUS_ENUM.PENDENTE) {
    return <DynamicWrapperResumeOrder id={checkoutId} />;
  }
  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse pb-20">
      <div className="md:w-[30%]">
        <CheckoutAddress
          checkoutId={checkoutId}
          checkoutDeliveryAddress={checkout?.deliveryAddress ?? null}
        />
      </div>
      <div className="md:w-[70%]">
        <ResumeItemsCheckout
          checkoutData={checkout ?? null}
          isErrorCheckout={isError}
          isLoadingCheckout={isLoading}
        />
      </div>
    </div>
  );
};

export { WrapperCheckout };
