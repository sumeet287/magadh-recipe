"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { useBreadcrumbs } from "@/lib/breadcrumb";
import { BreadcrumbItem } from "./breadcrumb-item";
import { cn } from "@/lib/utils";

const BreadcrumbRoot = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav">
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
BreadcrumbRoot.displayName = "BreadcrumbRoot";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight className="size-3.5" />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export function SiteBreadcrumb() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        <li>
          <BreadcrumbItem href="/" label="Home" isCurrent={false} />
        </li>
        {breadcrumbs.map((crumb) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbSeparator />
            <li>
              <BreadcrumbItem {...crumb} />
            </li>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}
