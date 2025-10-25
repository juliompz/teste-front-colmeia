import { PAYMENT_METHOD_ENUM } from "@/@types/ICheckout";
import { Button } from "@/components/ui/button";
import { CreditCard, CreditCardValue } from "@/components/ui/credit-card";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

import React, { useState } from "react";
import { FinishLoading } from "./finish-loading";

interface TabCreditCardProps {
  handleFinishPurchase: (paymentMethod: PAYMENT_METHOD_ENUM) => void;
  isPendingFinish: boolean;
}

const TabCreditCard = ({
  handleFinishPurchase,
  isPendingFinish,
}: TabCreditCardProps) => {
  const [card, setCard] = useState<CreditCardValue>({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const disableButton =
    Object.values(card).some((value) => value === "") || isPendingFinish;

  return (
    <div className="flex md:justify-center">
      <div>
        <CreditCard value={card} onChange={setCard} />
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={disableButton} className="cursor-pointer">
              Finalizar compra
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirme o pagamento</DialogTitle>
              <DialogDescription>
                Confirme o pagamento para finalizar a compra com seu cartão de
                crédito.
              </DialogDescription>
              {isPendingFinish && (
                <FinishLoading text="Validando cartão de crédito..." />
              )}
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() =>
                  handleFinishPurchase(PAYMENT_METHOD_ENUM.CREDIT_CARD)
                }
                disabled={disableButton}
                className="cursor-pointer"
              >
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export { TabCreditCard };
