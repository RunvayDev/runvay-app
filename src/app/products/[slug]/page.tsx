import { getProductBySlug, getAllProducts } from "@/lib/mongoose";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductReviews from "@/components/ProductReviews";
import SuggestedProducts from "@/components/SuggestedProducts";
import Review from "@/models/Review";

// Get reviews for a product
async function getProductReviews(productId: string) {
  const reviews = await Review.find({ productId })
    .sort({ createdAt: -1 })
    .limit(10);
  return JSON.parse(JSON.stringify(reviews));
}

// Get suggested products (excluding current product)
async function getSuggestedProducts(currentSlug: string, currentColor: string) {
  const products = await getAllProducts();
  return products
    .filter((p) => p.slug !== currentSlug && p.color.includes(currentColor))
    .slice(0, 4);
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [reviews, suggestedProducts] = await Promise.all([
    getProductReviews(product._id),
    getSuggestedProducts(slug, product.color[0]),
  ]);

  return (
    <main className="min-h-screen py-8">
      <ProductDetail product={product} />
      <div className="container mx-auto px-4">
        <ProductDetail product={product} />
        <ProductReviews productId={product._id} initialReviews={reviews} />
        <SuggestedProducts products={suggestedProducts} />
      </div>
    </main>
  );
}
