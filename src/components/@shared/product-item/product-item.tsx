import Image from "next/image";
import Link from "next/link";

import { formatMoneyBrl } from "@/utils/format-money-brl";
import { IProduct } from "@/@types/IProduct";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link
      href={`/produto/${firstVariant.slug}`}
      className="flex flex-col gap-4"
    >
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        sizes="100vw"
        height={0}
        width={0}
        className="h-auto w-full rounded-3xl"
      />
      <div className="flex max-w-[200px] flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatMoneyBrl(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
