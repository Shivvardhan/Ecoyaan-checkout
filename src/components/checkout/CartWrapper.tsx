"use client";

import { useEffect } from 'react';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { CartSummary } from './CartSummary';
import { ShippingForm } from './ShippingForm';
import { PaymentReview } from './PaymentReview';

interface CartWrapperProps {
  initialCart: {
    cartItems: any[];
    shipping_fee: number;
    discount_applied: number;
  };
}

export function CartWrapper({ initialCart }: CartWrapperProps) {
  const { step, setCartItems } = useCheckoutStore();

  useEffect(() => {
    if (initialCart?.cartItems) {
      setCartItems(initialCart.cartItems);
    }
  }, [initialCart, setCartItems]);

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-10 relative">
        {['Cart', 'Shipping', 'Payment'].map((label, idx) => (
          <div key={label} className="z-10 flex flex-col items-center gap-2">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step >= idx 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {idx + 1}
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${
              step >= idx ? 'text-green-700' : 'text-gray-400'
            }`}>
              {label}
            </span>
          </div>
        ))}
        <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-0" />
      </div>

      <div className="min-h-[400px]">
        {step === 0 && <CartSummary shippingFee={initialCart.shipping_fee} />}
        {step === 1 && <ShippingForm />}
        {step === 2 && <PaymentReview shippingFee={initialCart.shipping_fee} />}
      </div>
    </div>
  );
}