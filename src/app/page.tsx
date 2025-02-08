import Carousel from "@/components/Carousel";
import CardSection from "@/components/CardSection";
import HeroSection from "@/components/HeroSection";
import { getCachedProducts } from "@/lib/productCache";
import { Product } from "@/types/Product"; 



export default async function Home() {
  const products: Product[] = await getCachedProducts();

  // Select only a few products to show (e.g., latest 5 products)
  const featuredProducts = products.slice(0, 5).map((product) => ({
    name: product.name,
    description: product.description || "",  // Handle optional description
    price: product.price,
    stock: product.stock,
    size: product.size || [],
    color: product.color || [],
    images: product.images || [],
    slug: product.slug,
  }));

  const topPicks = products.slice(5, 10).map((product) => ({
    name: product.name,
    description: product.description || "",  // Handle optional description
    price: product.price,
    stock: product.stock,
    size: product.size || [],
    color: product.color || [],
    images: product.images || [],
    slug: product.slug,
  }));

  return (
    <>
      <Carousel />

      {/* Featured Products Section */}
      <CardSection title="Trending Picks" products={featuredProducts} />

      <HeroSection
        hTitle="Elevate Your Shopping Experience"
        subTitle="Discover the latest trends with unbeatable discounts."
        hImage="/Runvay(logo).jpg"
        hColor1="from-blue-600"
        hColor2="to-cyan-300"
      />
      
      {/* Top Picks Section */}
      <CardSection title="Top Picks" products={topPicks} />

      <HeroSection
        hTitle="Latest Collection"
        subTitle="Shop the latest collection of the season."
        hImage="/Runvay(logo).jpg"
        hColor1="from-rose-400"
        hColor2="to-yellow-600"
      />
    </>
  );
}
