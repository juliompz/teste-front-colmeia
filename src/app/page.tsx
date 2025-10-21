import Image from "next/image";
import { ListBrands } from "./components/list-brands/list-brands";
import { PageContainer } from "@/components/@shared/page-container/page-container";
import { Header } from "@/components/@shared/header/header";
import { ListBestSellingProduct } from "./components/list-best-selling/list-best-selling";
import { ListNewProducts } from "./components/list-new-products/list-new-products";
import { Footer } from "./components/footer/footer";

export default async function Page() {
  return (
    <div>
      <PageContainer>
        <Header />
        <div className="px-5">
          <Image
            src="/images/banner-shop.webp"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <div className="my-4">
          <ListBestSellingProduct />
        </div>
        <ListBrands />

        <Image
          src="/images/banner-2.jpg"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full mt-8"
        />
        <div className="my-4">
          <ListNewProducts />
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
