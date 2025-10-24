"use client";
import { IAddress } from "@/@types/IAddress";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@radix-ui/react-radio-group";
import React, { useEffect, useState } from "react";
import { AddNewAddressForm } from "./add-new-address-form";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteAddress } from "@/hooks/address/use-delete-address";
import { ADDRESS_KEY, useGetAddress } from "@/hooks/address/use-get-address";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertErrorWithReload } from "@/components/@shared/alert-error-with-reload";
import { useUpdateCheckoutAddress } from "@/hooks/checkout/use-update-address-checkout";
import { formatAddress } from "@/utils/format-address";

interface CheckoutAddressProps {
  checkoutId: string;
  checkoutDeliveryAddress: IAddress | null;
}

const CheckoutAddress = ({
  checkoutId,
  checkoutDeliveryAddress,
}: CheckoutAddressProps) => {
  // Enderecos do usuario
  const { data: addresses, isLoading, isError } = useGetAddress();
  const { mutateAsync: removeAddress } = useDeleteAddress();

  const { mutateAsync: updateCheckoutAddress } = useUpdateCheckoutAddress();
  const [selectedAddress, setSelectedAddress] = useState<string>(
    checkoutDeliveryAddress?.id ?? ""
  );

  useEffect(() => {
    setSelectedAddress(checkoutDeliveryAddress?.id ?? "");
  }, [checkoutDeliveryAddress]);

  const handleUpdateAddress = async (addressId: string) => {
    setSelectedAddress(addressId);
    if (addressId === checkoutDeliveryAddress?.id) return;
    if (addressId === "add_new") {
      setSelectedAddress(addressId);
      return;
    }
    const findAddress = addresses?.find((address) => address.id === addressId);
    if (!findAddress) return;
    await updateCheckoutAddress({
      checkoutId,
      address: findAddress,
    });
  };

  if (isLoading) return <LoadingAddresses />;

  if (isError) return <AlertErrorWithReload refetchQueryKey={ADDRESS_KEY} />;

  return (
    <Card className="p-4">
      <CardTitle>Endereço para entrega</CardTitle>
      <RadioGroup
        value={selectedAddress}
        onValueChange={handleUpdateAddress}
        className="space-y-2"
      >
        {addresses?.map((address) => (
          <Card key={address.id} className="relative">
            <CardContent>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value={address.id} id={address.id} />
                <div className="flex-1">
                  <Label htmlFor={address.id} className="cursor-pointer">
                    <div>
                      <p className="text-sm">{formatAddress(address)}</p>
                    </div>
                  </Label>
                </div>
              </div>
              <div className="absolute top-0 right-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAddress(address.id)}
                >
                  <TrashIcon className="text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="add_new" id="add_new" />
              <Label htmlFor="add_new">Adicionar novo endereço</Label>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>

      {selectedAddress === "add_new" && <AddNewAddressForm />}
    </Card>
  );
};

const LoadingAddresses = () => {
  return (
    <Card className="flex flex-col gap-4 px-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-[60px] w-full rounded-lg " />
      ))}
    </Card>
  );
};

export { CheckoutAddress };
