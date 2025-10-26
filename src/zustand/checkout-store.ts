import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CHECKOUT_STATUS_ENUM,
  ICheckout,
  PAYMENT_METHOD_ENUM,
} from "@/@types/ICheckout";
import { ICartItem } from "@/@types/ICart";
import { IAddress } from "@/@types/IAddress";

interface CheckoutState {
  checkouts: ICheckout[];
  createCheckout: (
    items: ICartItem[],
    status?: CHECKOUT_STATUS_ENUM,
    createdByCart?: boolean
  ) => ICheckout;

  updateCheckoutAddress: (checkoutId: string, address: IAddress) => void;
  updateCheckoutPaymentMethod: (
    checkoutId: string,
    paymentMethod: PAYMENT_METHOD_ENUM
  ) => void;
  getCheckoutById: (id: string) => ICheckout | undefined;
  finishCheckout: (id: string, status: CHECKOUT_STATUS_ENUM) => void;
  calculateTotal: (items: ICartItem[]) => number;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      checkouts: [],
      createCheckout: (
        items,
        status = CHECKOUT_STATUS_ENUM.PENDENTE,
        createdByCart
      ) => {
        const totalPriceInCents = get().calculateTotal(items);
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const date = new Date().toISOString();
        const newCheckout: ICheckout = {
          id: code,
          items,
          totalPriceInCents,
          status,
          paymentMethod: null,
          deliveryAddress: null,
          createdByCart: createdByCart,
          createdAt: date,
          updatedAt: date,
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
      updateCheckoutAddress: (checkoutId, address) => {
        set((state) => ({
          checkouts: state.checkouts.map((checkout) =>
            checkout.id === checkoutId
              ? { ...checkout, deliveryAddress: address }
              : checkout
          ),
        }));
      },
      updateCheckoutPaymentMethod: (checkoutId, paymentMethod) => {
        set((state) => ({
          checkouts: state.checkouts.map((checkout) =>
            checkout.id === checkoutId
              ? { ...checkout, paymentMethod }
              : checkout
          ),
        }));
      },

      getCheckoutById: (id) => {
        const checkout = get().checkouts.find((c) => c.id === id);
        if (!checkout) throw new Error("Checkout não encontrado");
        return checkout;
      },
      finishCheckout: async (id, status) => {
        const updatedDate = new Date().toISOString();
        const checkout = get().getCheckoutById(id);
        if (!checkout) throw new Error("Checkout não encontrado");
        if (checkout.status !== CHECKOUT_STATUS_ENUM.PENDENTE) {
          throw new Error("Checkout já finalizado");
        }
        set((state) => ({
          checkouts: state.checkouts.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status: status,
                  updatedAt: updatedDate,
                }
              : c
          ),
        }));
      },
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
