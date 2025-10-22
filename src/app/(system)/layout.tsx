import { Header } from "@/components/@shared/header/header";
import React from "react";
import { Footer } from "./components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
