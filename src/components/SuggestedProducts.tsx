 
import Link from "next/link";
 
import ProductCard from "@/components/ProductCard";
type Product = {
  name: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  size: string[];
  color: string[];
  stock: number;
};

export default function SuggestedProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="bg-white my-8">
    <div className="container mx-auto px-4 ">
    <h2 className="text-2xl font-bold text-gray-900 mb-6  py-4">
        Suggested Products
        </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr justify-items-center">

           {products.slice(0, 5).map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="flex justify-center w-full max-w-[280px]"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
        </div>
             
      
    </section>
  );
}
