"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/auth-store";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    // Verifica se o user é null
    if (user === null) {
      router.push("/autenticar");
    }
  }, [user, router]);

  if (user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 " />
      </div>
    );
  }

  return <>{children}</>;
};

export { ProtectedRoute };
