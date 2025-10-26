import { brands } from "@/utils/mock-data";
import Image from "next/image";
import React from "react";

const ListBrands = () => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">Navegue por marcas</h3>

      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col gap-2 p-6 items-center w-1/3 bg-accent rounded-2xl"
          >
            <Image
              src={brand.logoUrl}
              alt={brand.name}
              className="h-8 w-8 dark:invert dark:brightness-0 dark:hue-rotate-180"
              width={100}
              height={100}
            />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ListBrands };
