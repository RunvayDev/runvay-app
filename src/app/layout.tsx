// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { CartProvider } from '@/context/CartContext';
import Navbar from "@/components/Navbar";

import { ReactNode } from "react";
import "./globals.css"; // Or wherever your global styles are
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
        <body>
        <SessionProvider>
        <CartProvider>
          <Navbar/>
          {children}
          <Footer />
        </CartProvider>
    </SessionProvider>

        </body>
      </html>
  );
}
