// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
