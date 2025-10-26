"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/auth-store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
// LEIA: EM CASOS DE USO REAIS ESSA VERIFICAO SERIA FEITA NO MIDDLEWARE, ESSA SOLUCAO É APENAS ADPTADA PARA DEMONSTRAÇÃO POR CAUSA DOS DADOS DO USER ESTAREM NO LOCALSTORAGE
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    // Verifica se existe user
    if (user !== null) {
      router.push("/");
    }
  }, [user, router]);

  return <>{children}</>;
};

export { ProtectedRoute };
