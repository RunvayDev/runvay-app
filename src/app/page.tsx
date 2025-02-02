import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CardSection from "@/components/CardSection";
// import HeroSection from '@/components/HeroSection';
import ButtonComponent from "@/components/ButtonComponent";
import Link from "next/link";

const products = [
  {
    image: "/sample-hoodie.jpg",
    name: "T-Shirts",
    price: 999,
    originalPrice: 2499,
    discount: 1500,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "",
    price: 999,
    originalPrice: 2999,
    discount: 2000,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
  {
    image: "/sample-hoodie.jpg",
    name: "Hoodies",
    price: 949,
    originalPrice: 1799,
    discount: 850,
  },
];
export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <CardSection title="Shirts" products={products.slice(0, 5)} />
      <div className="flex items-center justify-center my-4 lg:mt-0 ">
        <Link href={{ pathname: "/search", query: { q: "Shirts" } }}>
          <ButtonComponent
            ButtonName="See all products &rarr;"
            TextColor="text-black"
            ButtonColor1="bg-transparent-500"
            ButtonColor2="hover:bg-gray-200"
            className="font-bold"
          />
        </Link>
      </div>
      {/* <HeroSection hTitle='Elevate Your Shopping Experience' subTitle='Discover the latest trends with unbeatable discounts.' hImage='/Runvay(logo).jpg' hColor1='from-blue-600' hColor2='to-cyan-300'/> */}
      <CardSection title="T-Shirts" products={products.slice(5, 10)} />
      <div className="flex items-center justify-center my-4 lg:mt-0 ">
        <Link href={{ pathname: "/search", query: { q: "T-Shirts" } }} passHref>
          <ButtonComponent
            ButtonName="See all products &rarr;"
            TextColor="text-black"
            ButtonColor1="bg-transparent-500"
            ButtonColor2="hover:bg-gray-200"
            className="font-bold"
          />
        </Link>
      </div>
      {/* <HeroSection hTitle='Brand New Collections' subTitle='Best deals on Hoodies, T-Shirts and Shirts' hImage='/carousel-sample.jpg' hColor1='from-rose-600' hColor2='to-orange-300'/> */}
      <CardSection title="Hoodies" products={products.slice(10, 15)} />
      <div className="flex items-center justify-center my-4 lg:mt-0 ">
        <Link href={{ pathname: "/search", query: { q: "Hoodies" } }}>
          <ButtonComponent
            ButtonName="See all products &rarr;"
            TextColor="text-black"
            ButtonColor1="bg-transparent-500"
            ButtonColor2="hover:bg-gray-200"
            className="font-bold"
          />
        </Link>
      </div>
       
    </>
  );
}

// Example

// import { auth } from "@/lib/auth"
// const session = await auth()
// if (!session?.user) return null
//   console.log(session.user.name);
//   console.log(session.user.email);
