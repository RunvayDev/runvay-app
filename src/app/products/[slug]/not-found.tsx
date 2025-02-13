// app/products/[slug]/not-found.tsx
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, we could not find the product you are looking for.
      </p>
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Back to Home
      </Link>
    </div>
  );
}
