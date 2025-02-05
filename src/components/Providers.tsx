// components/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider> {/* Ensures cart context is client-side */}
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
