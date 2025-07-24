// app/cart/page.tsx
'use client'

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


declare const window: any;

export default function CartPage() {
  const { status, data: session } = useSession();
  const { cartItems, isSyncing, removeFromCart, updateQuantity, cartTotal } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      localStorage.removeItem('runvayCart'); // Clear local cart after login
    }
  }, [status]);

  const handleCheckout = async () => {
    if (status !== 'authenticated') {
      router.push('/signin');
      return;
    }

    try {
      // 1. Create the order in the database with a 'pending' status
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            product: item.productId,
            name: item.name,
            price: item.price,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            image: item.image,
            slug: item.slug,
          })),
          totalAmount: cartTotal,
          shippingAddress: { // Placeholder shipping address
            street: '123 Fashion Ave',
            city: 'Styleburg',
            zip: '12345',
            country: 'Trendland',
          },
          paymentDetails: {
            status: 'pending',
          },
        }),
      });

      if (!orderRes.ok) {
        throw new Error('Failed to create order in the database.');
      }

      const dbOrder = await orderRes.json();

      // 2. Create a Razorpay order
      const razorpayRes = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cartTotal,
          currency: 'INR',
        }),
      });

      if (!razorpayRes.ok) {
        throw new Error('Failed to create Razorpay order.');
      }

      const razorpayOrder = await razorpayRes.json();

      // 3. Open the Razorpay checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Runvay',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        handler: function (response: any) {
          // Payment successful, redirect to orders page.
          // The webhook will handle updating the order status.
          router.push('/orders');
        },
        prefill: {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Checkout Error:', error);
      alert('An error occurred during checkout. Please try again.');
    }
  };

  if (isSyncing) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Syncing cart...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="border-b py-4 flex gap-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <Link href={`/products/${item.slug}`} className="text-lg font-semibold hover:underline">
                      {item.name}
                    </Link>
                    <div className="text-gray-500 mt-2">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(
                          item.productId, 
                          item.size, 
                          item.color, 
                          parseInt(e.target.value)
                        )}
                        className="border rounded px-2 py-1"
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}