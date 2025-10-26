import { IProductVariant } from "@/@types/IProduct";
import Image from "next/image";
import Link from "next/link";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: IProductVariant[];
}

const VariantSelector = ({
  selectedVariantSlug,
  variants,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4 md:flex-col md:items-start">
      {variants.map((variant) => (
        <Link
          href={`/produto/${variant.slug}`}
          key={variant.id}
          className={
            selectedVariantSlug === variant.slug
              ? "border-primary rounded-xl border-2"
              : ""
          }
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl}
            alt={variant.name}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export { VariantSelector };
