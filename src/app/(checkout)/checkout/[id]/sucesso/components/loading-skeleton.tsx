import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <Card className="mx-2">
      <CardContent className="pt-6 pb-6">
        {/* Título */}
        <div className="mb-6">
          <Skeleton className="h-7 w-48" />
        </div>

        {/* Produtos */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-start gap-4">
                <Skeleton className="h-20 w-20 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-7 w-20" />
          </div>
        </div>

        {/* Forma de Pagamento */}
        <div className="mb-6 pb-6 border-b">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Endereço de Entrega */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-36" />
          </div>
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-56 mt-1" />
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 flex-1 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export { LoadingSkeleton };
