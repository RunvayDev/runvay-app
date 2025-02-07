'use client'

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface AddToCartProps {
  product: {
    _id: string;
    name: string;
    price: number;
    slug: string;
    images: string[];
  };
  selectedSize: string;
  selectedColor: string;
}

export default function AddToCartButton({ product, selectedSize, selectedColor }: AddToCartProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      slug: product.slug,
      image: product.images[0]
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
        className="border rounded w-20 px-3 py-2"
      />
      <button
        onClick={handleAddToCart}
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}