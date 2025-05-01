"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: Record<string, unknown>;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayPaymentProps {
  orderId: string;
  onSuccess: () => void;
  onError: (error: RazorpayError) => void;
}

export function RazorpayPayment({
  orderId,
  onSuccess,
  onError,
}: RazorpayPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      // Step 1: Create payment order
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order");
      }

      const paymentData = await orderResponse.json();

      // Step 2: Open Razorpay checkout
      const options: RazorpayOptions = {
        key: "rzp_test_E8disNZaTitkeS",
        amount: paymentData.amount,
        currency: paymentData.currency,
        order_id: paymentData.orderId,
        name: "Bihar Bazaar",
        description: "Order Payment",
        handler: async function (response: RazorpayResponse) {
          try {
            // Step 3: Verify payment
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed");
            }

            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              toast.success("Payment successful!");
              onSuccess();
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            onError(error as RazorpayError);
          }
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      onError(error as RazorpayError);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-2 bg-muted rounded-lg space-y-2">
      <p className="text-xs text-muted-foreground">
        Pay securely with Razorpay
      </p>
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
          "Pay with Razorpay"
        )}
      </Button>
    </div>
  );
}
