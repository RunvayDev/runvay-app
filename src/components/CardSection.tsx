import ProductCard from "./ProductCard";
import Link from "next/link";

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

interface CardSectionProps {
  title: string;
  products: ProductProps[]; // Ensure products have the complete shape as required by ProductCard
}

const CardSection = ({ title, products }: CardSectionProps) => {
  return (
    <section className="bg-white my-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center py-4">
          {title}
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
};

export default CardSection;
