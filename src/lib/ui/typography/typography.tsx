import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-bold tracking-tight sm:text-5xl",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      h5: "text-lg font-semibold tracking-tight",
      h6: "text-base font-semibold tracking-tight",
      p: "text-base leading-7",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 border-[#E84A1C] pl-6 italic",
    },
    color: {
      default: "text-foreground",
      primary: "text-[#E84A1C]",
      secondary: "text-gray-600",
      muted: "text-gray-500",
      white: "text-white",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      normal: "normal-case",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "default",
    weight: "normal",
    align: "left",
    transform: "normal",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  truncate?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      color,
      weight,
      align,
      transform,
      as,
      truncate = false,
      seoTitle,
      seoDescription,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the element type based on variant or as prop
    const Element =
      as ||
      (variant?.startsWith("h")
        ? variant
        : variant === "blockquote"
        ? "blockquote"
        : "p");

    // SEO attributes
    const seoAttributes: Record<string, string> = {};
    if (seoTitle) seoAttributes.title = seoTitle;
    if (seoDescription) seoAttributes["aria-description"] = seoDescription;

    return (
      <Element
        className={cn(
          typographyVariants({ variant, color, weight, align, transform }),
          truncate && "truncate",
          className
        )}
        ref={ref as any}
        {...seoAttributes}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
