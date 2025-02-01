import { create } from "zustand";

interface CartState {
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCart: () => void;
  decrementCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0, // مقدار اولیه
  setCartCount: (count) => set({ cartCount: count }), // تغییر مقدار
  incrementCart: () => set((state) => ({ cartCount: state.cartCount + 1 })), // افزایش مقدار
  decrementCart: () =>
    set((state) => ({ cartCount: Math.max(state.cartCount - 1, 0) })), // کاهش مقدار
}));
