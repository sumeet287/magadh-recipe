"use client";

import { Button } from "@/lib/ui/button/button";

interface PaymentMethodSelectorProps {
  selectedPayment: "upi" | "whatsapp" | "razorpay";
  onSelect: (method: "upi" | "whatsapp" | "razorpay") => void;
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
      <Button
        variant={selectedPayment === "razorpay" ? "default" : "outline"}
        size="sm"
        className="flex-1"
        onClick={() => onSelect("razorpay")}
      >
        Razorpay
      </Button>
    </div>
  );
}
