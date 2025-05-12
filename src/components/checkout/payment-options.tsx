"use client";

import { Button } from "@/lib/ui/button/button";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { UPIPayment } from "./payment-options/upi-payment";
import { WhatsAppPayment } from "./payment-options/whatsapp-payment";
import { RazorpayPayment } from "./payment-options/razorpay-payment";
import { PaymentMethodSelector } from "./payment-options/payment-method-selector";
import { useCart } from "@/contexts/cart-context";

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: Record<string, unknown>;
}

export function PaymentOptions() {
  const { cart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<
    "upi" | "whatsapp" | "razorpay"
  >("upi");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const upiId = "biharbazaar@upi";

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const upiLink = `upi://pay?pa=${upiId}&pn=Bihar%20Bazaar&am=${total}&cu=INR`;

  useEffect(() => {
    QRCode.toDataURL(upiLink).then(setQrCodeUrl).catch(console.error);
  }, [upiLink]);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      if (selectedPayment === "upi") {
        window.open(upiLink, "_blank");
      } else if (selectedPayment === "whatsapp") {
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

  const handleRazorpaySuccess = () => {
    toast.success("Payment successful!");
  };

  const handleRazorpayError = (error: RazorpayError) => {
    console.error("Razorpay payment error:", error);
    toast.error(`Payment failed: ${error.description}`);
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
      ) : selectedPayment === "whatsapp" ? (
        <WhatsAppPayment />
      ) : (
        <RazorpayPayment
          orderId="ORDER_ID_FROM_BACKEND" // Replace with actual order ID
          onSuccess={handleRazorpaySuccess}
          onError={handleRazorpayError}
        />
      )}

      {selectedPayment !== "razorpay" && (
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
      )}
    </div>
  );
}
