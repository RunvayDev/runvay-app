import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Check, ShoppingCart, Minus, Plus } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);

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

    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    setQuantity(prev => {
      if (type === 'increment') return prev + 1;
      if (type === 'decrement') return Math.max(1, prev - 1);
      return prev;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => handleQuantityChange('decrement')}
            className="px-3 py-2 hover:bg-gray-100 transition-colors border-r"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            className="w-16 text-center px-3 py-2 focus:outline-none"
          />
          <button
            onClick={() => handleQuantityChange('increment')}
            className="px-3 py-2 hover:bg-gray-100 transition-colors border-l"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative overflow-hidden w-full py-4 px-6 rounded-lg font-medium transition-all duration-300 ${
          isAdded
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-black hover:bg-gray-800'
        } text-white transform hover:scale-[1.02] active:scale-[0.98]`}
      >
        <div className={`flex items-center justify-center gap-2 transition-transform duration-300 ${
          isAdded ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}>
          <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${
            isHovered ? 'rotate-12' : 'rotate-0'
          }`} />
          Add to Cart
        </div>
        <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 ${
          isAdded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <Check className="w-5 h-5" />
          Added to Cart!
        </div>
      </button>

      {/* Total Price */}
       
    </div>
  );
}