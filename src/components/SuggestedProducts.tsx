import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Product = {
  name: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  stock: number;
};

export default function SuggestedProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.slug}`} key={product.slug}>
            <Card className="overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 hover:text-black">
                  {product.name}
                </h3>
                <p className="text-red-500 font-medium">₹{product.price}</p>
                {product.stock <= 5 && product.stock > 0 && (
                  <Badge
                    variant="outline"
                    className="mt-2 bg-orange-100 text-orange-800 border-orange-200"
                  >
                    Only {product.stock} left!
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
