import { getProductBySlug } from "@/lib/mongoose";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <Image src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
    </div>
  );
}
