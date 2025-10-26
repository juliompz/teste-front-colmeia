"use client";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import React from "react";

const ErrorWithImage = ({
  refetchQueries,
  title,
}: {
  refetchQueries: string[];
  title: string;
}) => {
  const queryClient = useQueryClient();
  return (
    <div className="flex flex-col space-y-6 md:flex-row space-x-6">
      <div className="w-full md:w-1/2">
        <Image
          src="/images/error-image.png"
          alt="error"
          sizes="100vw"
          height={0}
          width={0}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-4 text-center">
          <p className="font-bold text-2xl">{title}</p>
          <p className="text-muted-foreground text-sm">
            Tente novamente mais tarde!
          </p>
          <Button
            variant={"outline"}
            onClick={() =>
              queryClient.refetchQueries({
                queryKey: refetchQueries,
              })
            }
          >
            <RefreshCcw />
            Recarregar
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ErrorWithImage };
