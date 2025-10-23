import Link from "next/link";

import Image from "next/image";
import { PageContainer } from "@/components/@shared/page-container";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";

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
        </div>
      </header>
    </PageContainer>
  );
};

export { Header };
