"use client";

import Link from "next/link";

interface BreadcrumbItemProps {
  href: string;
  label: string;
  isCurrent: boolean;
}

export function BreadcrumbItem({
  href,
  label,
  isCurrent,
}: BreadcrumbItemProps) {
  if (isCurrent) {
    return <span className="text-muted-foreground">{label}</span>;
  }

  return (
    <Link href={href} className="hover:text-primary transition-colors">
      {label}
    </Link>
  );
}
