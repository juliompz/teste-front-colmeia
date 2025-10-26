import { Footer } from "@/components/@shared/footer";
import React from "react";
import { ProtectedRoute } from "./components/protected-route";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProtectedRoute>{children}</ProtectedRoute>
        <Footer />
      </body>
    </html>
  );
}
