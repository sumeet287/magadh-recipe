"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#E84A1C] text-white hover:bg-[#c73d15] active:bg-[#a93410]",
        secondary:
          "bg-[#F5F5F5] text-[#333333] hover:bg-[#E5E5E5] active:bg-[#D5D5D5]",
        outline:
          "border border-[#E84A1C] bg-transparent text-[#E84A1C] hover:bg-[#FFF1ED] active:bg-[#FFE4DB]",
        ghost:
          "text-[#E84A1C] hover:bg-[#FFF1ED] hover:text-[#E84A1C] active:bg-[#FFE4DB]",
        link: "text-[#E84A1C] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
  iconClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      asChild = false,
      loading = false,
      preIcon,
      postIcon,
      iconClassName,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth, rounded, className })
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2
            className={cn(
              "mr-2 h-4 w-4 animate-spin",
              !children && "mr-0",
              iconClassName
            )}
          />
        )}
        {!loading && preIcon && (
          <span className={cn("mr-2", iconClassName)}>{preIcon}</span>
        )}
        {children}
        {!loading && postIcon && (
          <span className={cn("ml-2", iconClassName)}>{postIcon}</span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
