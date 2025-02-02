import Image from "next/image";
import ButtonComponent from "./ButtonComponent";

interface ProductProps {
  image: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
}

const ProductCard = ({ image, name, price, originalPrice, discount }: ProductProps) => {
  return (
    <div className="group w-64 bg-white shadow-lg rounded-xl overflow-hidden border transition-transform transform hover:scale-105 flex flex-col h-[400px] ">
      {/* Image Section */}
      <div className="relative w-full h-56">
        <Image src={image} alt={name} layout="fill" objectFit="cover" className="group-hover:opacity-90" priority />
      </div>

      {/* Text Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 min-h-[48px]">{name}</h3>

        <div className="text-gray-700">
          <span className="text-xl font-bold">₹{price}</span>
          <span className="line-through ml-2 text-gray-500">₹{originalPrice}</span>
          <span className="text-green-600 font-bold ml-2">{discount}</span>
        </div>

        <p className="text-sm text-purple-600 mt-1">Lowest price in last 30 days</p>

        <div className="flex-grow"></div>

        
        <div>
          <ButtonComponent ButtonName="Add to Cart" TextColor="text-white" ButtonColor1="bg-blue-500" ButtonColor2="hover:bg-blue-700"/>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
