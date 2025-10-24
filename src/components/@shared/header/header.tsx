import Link from "next/link";
import { ThemeToggle } from "../../theme-toggle/theme-toggle";
import Image from "next/image";
import { Cart } from "./cart";
import { PageContainer } from "../page-container";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <PageContainer>
      <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4">
        <div className="flex items-center gap-2 ">
          <Link href="/">
            <Image
              src="/images/logos/colmeiaStoreLogo.png"
              alt="COLMEIASTORE"
              width={100}
              height={26.14}
            />
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 ">
          <Button variant={"outline"}>Meus pedidos</Button>
          <Cart />
        </div>
      </header>
    </PageContainer>
  );
};

export { Header };
