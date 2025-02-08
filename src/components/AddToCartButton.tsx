'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      slug: product.slug,
      image: product.images[0],
    });

    // Show the "Added to Cart" message
    setIsAdded(true);

    // Hide the message after 3 seconds
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <div className="relative flex items-center gap-4">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
        className="border rounded w-20 px-3 py-2"
      />
      <button
        onClick={handleAddToCart}
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors relative"
      >
        Add to Cart

        {/* Animated feedback near the button */}
        <AnimatePresence>
          {isAdded && (
            <motion.div
              className="absolute top-1/2 right-[-110%] bg-green-600 text-white text-sm px-3 py-1 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              Added!
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
