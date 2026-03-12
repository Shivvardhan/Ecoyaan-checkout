import { CartWrapper } from '@/components/checkout/CartWrapper';

async function getCartData() {
  const res = await fetch('http://localhost:3000/api/cart', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch cart data');
  return res.json();
}

export default async function CheckoutPage() {
  const initialData = await getCartData();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Checkout</h1>
        <CartWrapper initialCart={initialData} />
      </div>
    </div>
  );
}