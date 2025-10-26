import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Breadcrumb as ShadcnBreadcrumb,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";

interface BreadcrumbItemProps {
  href: string;
  title: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        {items.map((item) => (
          <div key={item.href} className="flex items-center gap-1">
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
          </div>
        ))}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
};

export default Breadcrumb;
