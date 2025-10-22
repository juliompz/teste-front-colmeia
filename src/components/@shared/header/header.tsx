import Link from "next/link";
import { ThemeToggle } from "../../theme-toggle/theme-toggle";
import { NavigationMenuItems } from "./navigation-menu";
import Image from "next/image";
import { Cart } from "./cart";
import { PageContainer } from "../page-container/page-container";

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
        </div>
        <div>
          <ThemeToggle />
          <Cart />
        </div>
      </header>

      <div className="flex flex-row gap-4 px-4 justify-center">
        <NavigationMenuItems />
      </div>
    </PageContainer>
  );
};

export { Header };
