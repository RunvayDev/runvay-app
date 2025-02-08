"use client";
import Image from "next/image";


interface ProductProps {
  name: string;
  description?: string;
  price: number;
  stock: number;
  size: string[];
  color: string[];
  images: string[];
  slug: string;
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  return (
    <div className="group w-58 bg-white shadow-lg rounded-xl overflow-hidden border transition-transform transform hover:scale-105 flex flex-col h-[400px] my-2">
      {/* Image Section */}
      <div className="relative w-full h-56">
        {product.images.length > 0 && (
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-90"
            priority
          />
        )}
      </div>

      {/* Text Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 min-h-[48px]">
          {product.name}
        </h3>

        <div className="text-gray-700">
          <span className="text-xl font-bold">₹{product.price}</span>
        </div>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        <p className="text-xs text-green-600 mt-1">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <div className="flex-grow"></div>

        
      </div>
    </div>
  );
};

export default ProductCard;
