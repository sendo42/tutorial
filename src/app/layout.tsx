import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner"
import ZodProviders from "@/components/providers/ZodProviders";



export const metadata: Metadata = {
  title: "ECサイト",
  description: "オンラインショッピングサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ZodProviders>
          {children}
        </ZodProviders>
        <Toaster/>
      </body>
    </html>
  );
}
