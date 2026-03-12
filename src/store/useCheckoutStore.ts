import { create } from 'zustand';

interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

interface CheckoutState {
  step: number;
  cartItems: CartItem[];
  shippingDetails: ShippingDetails | null;
  setStep: (step: number) => void;
  setCartItems: (items: CartItem[]) => void;
  setShippingDetails: (details: ShippingDetails) => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  step: 0,
  cartItems: [],
  shippingDetails: null,
  setStep: (step) => set({ step }),
  setCartItems: (cartItems) => set({ cartItems }),
  setShippingDetails: (shippingDetails) => set({ shippingDetails }),
}));