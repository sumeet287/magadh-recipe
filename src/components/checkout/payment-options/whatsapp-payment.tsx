"use client";

import { CheckCircle2 } from "lucide-react";

export function WhatsAppPayment() {
  return (
    <div className="p-2 bg-muted rounded-lg space-y-1">
      <p className="text-xs text-muted-foreground">Place order via WhatsApp</p>
      <div className="space-y-0.5">
        {["Instant confirmation", "Secure payment", "24/7 support"].map(
          (text) => (
            <div key={text} className="flex items-center gap-1 text-xs">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span>{text}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
