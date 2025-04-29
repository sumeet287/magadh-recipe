import { useState } from "react";
import { toast } from "sonner";
import { paymentApi } from "@/lib/endpoints/payment";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
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

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (orderId: string) => {
    try {
      setIsProcessing(true);

      // Step 1: Create payment order
      const { data: paymentData } = await paymentApi.createOrder(orderId);

      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        throw new Error("Razorpay key is not configured");
      }

      // Step 2: Initialize Razorpay checkout
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: paymentData.amount,
        currency: paymentData.currency,
        order_id: paymentData.orderId || "",
        name: "Craft Bihar",
        description: "Payment for your order",
        handler: async (response) => {
          try {
            // Step 3: Verify payment
            const { data: verifyData } = await paymentApi.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyData.success) {
              toast.success("Payment successful!");
            } else {
              throw new Error(
                verifyData.message || "Payment verification failed"
              );
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error(
              error instanceof Error
                ? error.message
                : "Payment verification failed"
            );
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

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handlePayment,
    isProcessing,
  };
}
