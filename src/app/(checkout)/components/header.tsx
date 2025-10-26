import { PageContainer } from "@/components/@shared/page-container";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";
import { Logo } from "@/components/@shared/logo";

const Header = () => {
  return (
    <PageContainer>
      <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4">
        <div className="flex items-center gap-2 ">
          <Logo />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </header>
    </PageContainer>
  );
};

export { Header };
