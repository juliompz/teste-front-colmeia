"use client";
import React from "react";
import { CheckoutAddress } from "./checkout-address";
import { ResumeItemsCheckout } from "./resume-items-checkout";
import { useGetCheckoutById } from "@/hooks/checkout/use-get-checkout-by-id";
import { CHECKOUT_STATUS_ENUM } from "@/@types/ICheckout";
import { WrapperResumeOrder } from "../finalizar/components/wrapper-resume-order";

const WrapperCheckout = ({ checkoutId }: { checkoutId: string }) => {
  const { data: checkout, isLoading, isError } = useGetCheckoutById(checkoutId);
  if (checkout?.status !== CHECKOUT_STATUS_ENUM.PENDENTE) {
    return <WrapperResumeOrder id={checkoutId} />;
  }
  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse">
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
