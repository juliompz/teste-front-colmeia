"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangleIcon, RefreshCcwIcon } from "lucide-react";
import React from "react";

const AlertErrorWithReload = ({
  refetchQueryKey,
}: {
  refetchQueryKey: string[];
}) => {
  const queryClient = useQueryClient();
  return (
    <Alert className="mb-4" variant="destructive">
      <AlertTriangleIcon className="h-5 w-5 " />
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
        <div>
          <AlertTitle>Erro ao carregar dados</AlertTitle>
          <AlertDescription>
            Algo deu errado, tente novamente mais tarde.
          </AlertDescription>
        </div>
        <Button
          className="mt-2 md:mt-0 md:ml-4"
          onClick={() =>
            queryClient.refetchQueries({ queryKey: refetchQueryKey })
          }
          type="button"
          variant="outline"
        >
          <RefreshCcwIcon className="w-4 h-4 mr-2" />
          Recarregar
        </Button>
      </div>
    </Alert>
  );
};

export { AlertErrorWithReload };
