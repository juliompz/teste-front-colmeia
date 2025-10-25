import { Footer } from "@/components/@shared/footer";
import React from "react";
import { Header } from "./components/header";
import { ProtectedRoute } from "./components/protected-route";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ProtectedRoute>{children}</ProtectedRoute>
        <Footer />
      </body>
    </html>
  );
}
