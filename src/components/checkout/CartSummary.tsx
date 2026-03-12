"use client";

import { useCheckoutStore } from '@/store/useCheckoutStore';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';

export interface CartSummaryProps {
  shippingFee: number;
}

export function CartSummary({ shippingFee }: CartSummaryProps) {
  const { cartItems, setStep } = useCheckoutStore();

  const subtotal = cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
        <p className="text-gray-400 mt-2">Looks like you haven't added anything yet.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-green-600" />
          Review Your Cart
        </h2>
        <span className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">
          {cartItems.length} Items
        </span>
      </div>

      {/* Product List */}
      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div 
            key={item.product_id} 
            className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-green-200 transition-colors"
          >
            <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
               {/* Note: Using a standard img tag here since placeholder URLs sometimes conflict with Next.js Image optimization config */}
              <img 
                src={item.image} 
                alt={item.product_name}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 leading-tight">{item.product_name}</h3>
              <p className="text-sm text-gray-500 mt-1">₹{item.product_price} per unit</p>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity: {item.quantity}</span>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-900">₹{item.product_price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals Card */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Standard Shipping</span>
          <span className="font-medium text-gray-900">₹{shippingFee}</span>
        </div>
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Grand Total</span>
          <span className="text-2xl font-extrabold text-green-700">₹{total}</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => setStep(1)}
        className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
      >
        Proceed to Shipping
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-center text-xs text-gray-400 mt-4">
        By proceeding, you agree to our terms of service and carbon-neutral shipping policy.
      </p>
    </div>
  );
}