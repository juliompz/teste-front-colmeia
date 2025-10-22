import { Button } from "@/components/ui/button";
import { CreditCard, CreditCardValue } from "@/components/ui/credit-card";
import React, { useState } from "react";

const TabCreditCard = () => {
  const [card, setCard] = useState<CreditCardValue>({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  return (
    <div>
      <CreditCard value={card} onChange={setCard} />
      <div className="flex justify-end">
        <Button>Finalizar compra</Button>
      </div>
    </div>
  );
};

export { TabCreditCard };
