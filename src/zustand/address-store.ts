import { IAddress } from "@/@types/IAddress";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AddressState {
  addresses: IAddress[];
  addAddress: (data: Omit<IAddress, "id">) => void;
  removeAddress: (id: string) => void;
  clearAddresses: () => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],

      addAddress: (data) => {
        const newAddress: IAddress = {
          id: crypto.randomUUID(),
          ...data,
        };
        set({ addresses: [...get().addresses, newAddress] });
      },

      removeAddress: (id) => {
        set({
          addresses: get().addresses.filter((a) => a.id !== id),
        });
      },

      clearAddresses: () => {
        set({ addresses: [] });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
