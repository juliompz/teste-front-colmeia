import { IProduct } from "@/@types/IProduct";
import ProductItem from "../product-item";
import { AlertErrorWithReload } from "../alert-error-with-reload";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRef } from "react";

interface ProductListProps {
  title: string;
  isError: boolean;
  isLoading: boolean;
  refetchQueryKey: string[];
  products: IProduct[];
}

const ProductList = ({
  title,
  products,
  isError,
  isLoading,
  refetchQueryKey,
}: ProductListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div>
        <p className="px-5 font-semibold">{title}</p>
        <div className="flex w-full gap-4 overflow-x-auto px-5 ">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className=" h-56 w-full rounded-lg " />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <AlertErrorWithReload refetchQueryKey={refetchQueryKey} />;
  }

  return (
    <div className="space-y-3">
      <p className="px-5 font-semibold">{title}</p>
      <div className="hidden md:flex flex-row justify-end gap-2">
        <Button size={"icon-sm"} variant={"outline"} asChild>
          <ArrowLeftIcon className="w-5 h-5" onClick={scrollLeft} />
        </Button>
        <Button size={"icon-sm"} variant={"outline"} asChild>
          <ArrowRightIcon className="w-5 h-5" onClick={scrollRight} />
        </Button>
      </div>
      <div
        className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden"
        ref={scrollRef}
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export { ProductList };
