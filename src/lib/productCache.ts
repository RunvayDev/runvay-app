import { getAllProducts } from "@/lib/mongodb";
import { Product } from "@/types/product";
  
// Global variables for caching
let cachedProducts: Product[] | null = null;
let lastFetchTime = 0;

// Cache duration (set to 12 hours)
const CACHE_DURATION = 12 * 60 * 60 * 1000;

/**
 * Fetches products from the database if cache is expired, otherwise returns cached data.
 */
export async function getCachedProducts(): Promise<Product[]> {
  const now = Date.now();

  // If cache is still valid, return cached products
  if (cachedProducts && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedProducts;
  }

  // If cache expired or doesn't exist, fetch fresh data
  const rawProducts = await getAllProducts(); // Get raw Mongoose data

  // Map the raw products to match the Product type
  cachedProducts = rawProducts.map((product) => ({
    _id: product._id as string,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    size: product.size || [],
    color: product.color || [],
    images: product.images || [],
    slug: product.slug,
  }));

  lastFetchTime = now;
  return cachedProducts;
}
