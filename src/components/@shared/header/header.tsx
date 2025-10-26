import Link from "next/link";
import { ThemeToggle } from "../../theme-toggle/theme-toggle";
import Image from "next/image";
import { Cart } from "./cart";
import { PageContainer } from "../page-container";
import { Button } from "@/components/ui/button";
import { Logo } from "../logo";

const Header = () => {
  return (
    <PageContainer>
      <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4">
        <div className="flex items-center gap-2 ">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 ">
          <Button variant={"outline"} asChild>
            <Link href="/pedidos">Meus pedidos</Link>
          </Button>
          <Cart />
        </div>
      </header>
    </PageContainer>
  );
};

export { Header };
