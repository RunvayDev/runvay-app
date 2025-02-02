import Link from "next/link";
import { getAllProducts } from "@/lib/mongoose";
import Image from "next/image";

export default async function ProductsPage() {
  const products = await getAllProducts(); // Fetch all products from MongoDB

  return (
    <div>
      <h1>All Products</h1>
      <div>
        {products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`}>
            <div>
              <h2>{product.name}</h2>
              <p>Price: ₹{product.price}</p>
              <Image src={product.image} alt={product.name} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
