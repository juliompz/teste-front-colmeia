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

import React, { useState } from "react";

interface TabCreditCardProps {
  handleFinishPurchase: (paymentMethod: PAYMENT_METHOD_ENUM) => void;
}

const TabCreditCard = ({ handleFinishPurchase }: TabCreditCardProps) => {
  const [card, setCard] = useState<CreditCardValue>({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const disableButton = Object.values(card).some((value) => value === "");

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
