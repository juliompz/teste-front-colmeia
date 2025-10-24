import { IAddress } from "@/@types/IAddress";

export const formatAddress = (address: IAddress) => {
  return `${address.address}, ${address.neighborhood}, ${address.city}, ${address.state}`;
};
