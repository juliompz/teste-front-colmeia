// stores/cart-store.ts
import { IProductVariant } from "@/@types/IProduct";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ICartItem {
  id: number;
  productVariant: IProductVariant;
  quantity: number;
}

interface CartState {
  totalPriceInCents: number;
  items: ICartItem[];
  addItem: (product: IProductVariant, quantity: number) => void;

  decreaseItem: (productId: number) => void;
  increaseItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  recalculateTotal: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      totalPriceInCents: 0,
      items: [],

      addItem: (product, quantity) => {
        const items = [...get().items];
        const existing = items.find(
          (item) => item.productVariant.id === product.id
        );

        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({
            id: Math.ceil(Math.random() * 10),
            productVariant: product,
            quantity: quantity,
          });
        }

        set({ items });
        get().recalculateTotal();
      },

      removeItem: (productId) => {
        let items = [...get().items];
        const existing = items.find(
          (item) => item.productVariant.id === productId
        );

        if (!existing) return;

        items = items.filter((item) => item.productVariant.id !== productId);

        set({ items });
        get().recalculateTotal();
      },

      decreaseItem: (productId) => {
        const items = [...get().items];
        const existing = items.find(
          (item) => item.productVariant.id === productId
        );
        if (!existing) return;

        if (existing.quantity > 1) {
          existing.quantity -= 1;
          set({ items });
        } else {
          // Se for 1 e clicar em "-", remove o item do carrinho
          set({
            items: items.filter((item) => item.productVariant.id !== productId),
          });
        }

        get().recalculateTotal();
      },

      increaseItem: (productId) => {
        const items = [...get().items];
        const existing = items.find(
          (item) => item.productVariant.id === productId
        );
        if (!existing) return;

        existing.quantity += 1;
        set({ items });
        get().recalculateTotal();
      },
      clearCart: () => set({ items: [], totalPriceInCents: 0 }),

      recalculateTotal: () => {
        const total = get().items.reduce(
          (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
          0
        );
        set({ totalPriceInCents: total });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
