import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CHECKOUT_STATUS_ENUM, ICheckout } from "@/@types/ICheckout";
import { ICartItem } from "@/@types/ICart";

interface CheckoutState {
  checkouts: ICheckout[];
  createCheckout: (
    items: ICartItem[],
    status?: CHECKOUT_STATUS_ENUM
  ) => ICheckout;
  updateCheckoutStatus: (id: string, status: CHECKOUT_STATUS_ENUM) => void;
  getCheckoutById: (id: string) => ICheckout | undefined;
  clearCheckouts: () => void;
  calculateTotal: (items: ICartItem[]) => number;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      checkouts: [],

      createCheckout: (items, status = CHECKOUT_STATUS_ENUM.PENDENTE) => {
        const totalPriceInCents = get().calculateTotal(items);

        const newCheckout: ICheckout = {
          id: crypto.randomUUID(),
          items,
          totalPriceInCents,
          status,
        };

        // Funcao para ordenar as listas e compara item a item
        const sameItems = (itemsX: ICartItem[], itemsY: ICartItem[]) => {
          if (itemsX.length !== itemsY.length) return false;
          const sortFn = (x: ICartItem, y: ICartItem) =>
            x.productVariant.id - y.productVariant.id;

          const sortedA = [...itemsX].sort(sortFn);
          const sortedB = [...itemsY].sort(sortFn);

          return sortedA.every(
            (item, i) =>
              item.productVariant.id === sortedB[i].productVariant.id &&
              item.quantity === sortedB[i].quantity
          );
        };

        // VERIFICAR SE JA EXISTE UM CHECKOUT COM MESMOS ITENS COM STATUS == PENDENTE
        const existsExactCheckout = get().checkouts.find(
          (c) =>
            c.status === newCheckout.status &&
            sameItems(c.items, newCheckout.items)
        );

        // AQUI EU VERIFICO SE JA EXISTE UM CHECKOUT COM OS EXATOS MESMOS ITENS E SE O STATUS É PENDENTE
        if (
          existsExactCheckout &&
          existsExactCheckout.status === CHECKOUT_STATUS_ENUM.PENDENTE
        ) {
          return existsExactCheckout;
        }

        set((state) => ({
          checkouts: [...state.checkouts, newCheckout],
        }));

        return newCheckout;
      },

      updateCheckoutStatus: (id, status) => {
        set((state) => ({
          checkouts: state.checkouts.map((checkout) =>
            checkout.id === id ? { ...checkout, status } : checkout
          ),
        }));
      },

      getCheckoutById: (id) => {
        const checkout = get().checkouts.find((c) => c.id === id);
        if (!checkout) throw new Error("Checkout não encontrado");
        return checkout;
      },

      clearCheckouts: () => set({ checkouts: [] }),

      calculateTotal: (items) =>
        items.reduce(
          (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
          0
        ),
    }),
    {
      name: "checkout-storage",
    }
  )
);
