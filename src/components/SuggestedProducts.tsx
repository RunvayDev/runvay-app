// src/components/SuggestedProducts.tsx
import Image from "next/image";
import Link from "next/link";

type Product = {
  name: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  stock: number;
};

export default function SuggestedProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/${product.slug}`}
            key={product.slug}
            className="group"
          >
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600">
                  {product.name}
                </h3>
                <p className="text-red-500 font-medium">₹{product.price}</p>
                {product.stock <= 5 && product.stock > 0 && (
                  <p className="text-sm text-orange-500 mt-1">
                    Only {product.stock} left!
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
