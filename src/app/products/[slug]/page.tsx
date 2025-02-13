import { getCachedProducts } from "@/lib/productCache";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductReviews from "@/components/ProductReviews";
import SuggestedProducts from "@/components/SuggestedProducts";
import Review from "@/models/Review";
import {Product }from "@/types/product"
 

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  size: string[];
  color: string[];
  images: string[];
  slug: string;
}
// Get reviews for a product
async function getProductReviews(productId: string) {
  const reviews = await Review.find({ productId })
    .sort({ createdAt: -1 })
    .limit(10);
  return JSON.parse(JSON.stringify(reviews));
} 

// Get suggested products (excluding current product)
async function getSuggestedProducts(cachedProducts: Product[], // Using cached products
  currentSlug: string
) {
  return cachedProducts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);
}

// Ensure `params.slug` exists before using it
export default async function ProductPage({
  params,
}: {
  params?: { slug?: string };
}) {
  if (!params?.slug) {
    notFound();
  }

  const slug = decodeURIComponent(params.slug);
  const cachedProducts = await getCachedProducts();
  const product = cachedProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const [reviews, suggestedProducts] = await Promise.all([
    getProductReviews(product._id.toString()), // Ensure ID is string
    getSuggestedProducts(cachedProducts,slug), // Handle optional color
  ]);

  return (
    <main className="min-h-screen py-8">
      <ProductDetail product={JSON.parse(JSON.stringify(product))} />
      <div className="container mx-auto px-4">
        <ProductReviews
          productId={product._id?.toString()}
          initialReviews={reviews}
        />
        <SuggestedProducts products={suggestedProducts} />
      </div>
    </main>
  );
}
