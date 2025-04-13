"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { UPIPayment } from "./payment-options/upi-payment";
import { WhatsAppPayment } from "./payment-options/whatsapp-payment";
import { PaymentMethodSelector } from "./payment-options/payment-method-selector";

export function PaymentOptions() {
  const [selectedPayment, setSelectedPayment] = useState<"upi" | "whatsapp">(
    "upi"
  );
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const upiId = "biharbazaar@upi";
  const upiLink = `upi://pay?pa=${upiId}&pn=Bihar%20Bazaar&am=${1000}&cu=INR`;

  useEffect(() => {
    QRCode.toDataURL(upiLink).then(setQrCodeUrl).catch(console.error);
  }, [upiLink]);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      if (selectedPayment === "upi") {
        window.open(upiLink, "_blank");
      } else {
        const message = "I want to place an order";
        window.open(
          `https://wa.me/919810790293?text=${encodeURIComponent(message)}`,
          "_blank"
        );
      }
      toast.success("Payment initiated!");
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-2 space-y-2">
      <PaymentMethodSelector
        selectedPayment={selectedPayment}
        onSelect={setSelectedPayment}
      />

      {selectedPayment === "upi" ? (
        <UPIPayment
          upiId={upiId}
          qrCodeUrl={qrCodeUrl}
          onCopy={() => {
            navigator.clipboard.writeText(upiId);
            toast.success("Copied!");
          }}
        />
      ) : (
        <WhatsAppPayment />
      )}

      <Button
        className="w-full"
        size="sm"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay via ${selectedPayment === "upi" ? "UPI" : "WhatsApp"}`
        )}
      </Button>
    </div>
  );
}
