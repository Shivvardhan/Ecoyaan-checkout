"use client";

import { useState } from 'react';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { CheckCircle2, CreditCard, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function PaymentReview({ shippingFee }: { shippingFee: number }) {
  const { cartItems, shippingDetails, setStep } = useCheckoutStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
  const total = subtotal + shippingFee;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for choosing Ecoyaan. Your sustainable goodies are on their way!
        </p>
        <Link 
          href="/"
          className="inline-block bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-green-600" />
          Review & Pay
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Summary */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Shipping To</h3>
            <p className="font-bold text-gray-900 text-lg">{shippingDetails?.fullName}</p>
            <p className="text-gray-600 mt-1">{shippingDetails?.email}</p>
            <p className="text-gray-600">{shippingDetails?.phone}</p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700">
                {shippingDetails?.city}, {shippingDetails?.state} - {shippingDetails?.pinCode}
              </p>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="space-y-3">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Summary</h3>
             <div className="flex justify-between text-gray-600">
               <span>Items Subtotal</span>
               <span>₹{subtotal}</span>
             </div>
             <div className="flex justify-between text-gray-600">
               <span>Shipping Fee</span>
               <span>₹{shippingFee}</span>
             </div>
             <div className="flex justify-between text-xl font-bold text-green-800 pt-3 border-t">
               <span>Total Amount</span>
               <span>₹{total}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t">
        <button
          onClick={() => setStep(1)}
          disabled={isProcessing}
          className="flex-1 flex items-center justify-center gap-2 py-4 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="flex-[2] bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-100"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ₹${total} Securely`
          )}
        </button>
      </div>
    </div>
  );
}