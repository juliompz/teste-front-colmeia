import { IAddress } from "@/@types/IAddress";

export const formatAddress = (address: IAddress | null) => {
  if(!address) return "Não informado"
  return `${address.address}, ${address.neighborhood}, ${address.city}, ${address.state}`;
};
