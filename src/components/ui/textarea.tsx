import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-h-16 px-3 py-2 text-base md:text-sm rounded-md shadow-xs outline-none transition-[color,box-shadow]",
        "bg-background text-foreground border border-input placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "field-sizing-content",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
