import Link from "next/link";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <div className="h-4 w-4 rounded-sm bg-background" />
              </div>
              <span className="text-lg font-semibold">colmeiastore.io</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto sm:mx-0">
              A sua loja de roupas e acessórios
            </p>
            <div className="flex justify-center gap-4 sm:justify-start">
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="space-y-3">
              {["Overview", "Pricing", "Marketplace", "Features"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground block"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-3">
              {["About", "Team", "Blog", "Careers"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-3">
              {["Help", "Sales", "Advertise", "Privacy"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t pt-6 text-sm text-muted-foreground sm:mt-12 sm:flex-row sm:justify-between sm:pt-8">
          <p className="text-center sm:text-left">
            © 2025 colmeiastore.io Todos direitos reservados.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="transition-colors hover:text-foreground text-xs sm:text-sm"
            >
              Terms and Conditions
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-foreground text-xs sm:text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
