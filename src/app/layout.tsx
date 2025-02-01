// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import "./globals.css"; // Or wherever your global styles are

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
