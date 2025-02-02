import ProductCard from "./ProductCard";

interface CardSectionProps {
  title: string;
  products: {
    image: string;
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
  }[];
}

const CardSection = ({ title, products }: CardSectionProps) => {
  return (
    <section className="bg-white my-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center py-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full max-w-[280px]">
                <ProductCard {...product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSection;
