// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { CartProvider } from '@/context/CartContext';
import Navbar from "@/components/Navbar";
import { getCachedProducts } from "@/lib/productCache";
import { ReactNode } from "react";
import "./globals.css"; // Or wherever your global styles are
import Footer from "@/components/Footer";

interface Product {
  name: string;
  description?: string;
  price: number;
  stock: number;
  size: string[];
  color: string[];
  images: string[];
  slug: string;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  let products: Product[] = [];

  try {
    const cachedProducts = await getCachedProducts();
    products = cachedProducts.map((product) => ({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      size: product.size || [],
      color: product.color || [],
      images: product.images || [],
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error fetching cached products:", error);
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Runvay — Modern E-commerce Platform" />
        <link rel="icon" href="/favicon.ico" />
        <title>Runvay</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className="flex flex-col">
        <SessionProvider>
          <CartProvider>
            <Navbar products={products} />
            <main className="flex-grow min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>

  );
}
