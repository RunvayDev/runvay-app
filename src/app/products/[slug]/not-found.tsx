// app/products/[slug]/not-found.tsx
export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the product you're looking for.
      </p>
      <a
        href="/"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Back to Home
      </a>
    </div>
  );
}
