import { NextResponse } from 'next/server';

export async function GET() {
  const mockData = {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=200&auto=format&fit=crop"
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=200&auto=format&fit=crop"
      }
    ],
    shipping_fee: 50,
    discount_applied: 0
  };

  return NextResponse.json(mockData);
}