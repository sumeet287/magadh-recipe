"use client";

import { Button } from "@/components/ui/button";

interface PaymentMethodSelectorProps {
  selectedPayment: "upi" | "whatsapp";
  onSelect: (method: "upi" | "whatsapp") => void;
}

export function PaymentMethodSelector({
  selectedPayment,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="flex gap-1">
      <Button
        variant={selectedPayment === "upi" ? "default" : "outline"}
        size="sm"
        className="flex-1"
        onClick={() => onSelect("upi")}
      >
        UPI
      </Button>
      <Button
        variant={selectedPayment === "whatsapp" ? "default" : "outline"}
        size="sm"
        className="flex-1"
        onClick={() => onSelect("whatsapp")}
      >
        WhatsApp
      </Button>
    </div>
  );
}
