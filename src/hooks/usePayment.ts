import { useState } from "react";
import { toast } from "sonner";
import { paymentApi } from "@/lib/endpoints/payment";
import { useRouter } from "next/navigation";
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
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const router = useRouter();
  const handlePayment = async (
    orderId: string,
    paymentMethod: "online" | "cash_on_delivery"
  ) => {
    try {
      setIsProcessing(true);

      // Step 1: Create payment order based on payment method
      const { data: paymentData } =
        paymentMethod === "online"
          ? await paymentApi.createOnlineOrder(orderId)
          : await paymentApi.createCodOrder(orderId);

      if (paymentMethod === "online") {
        /* if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
          throw new Error("Razorpay key is not configured");
        } */

        // Step 2: Initialize Razorpay checkout
        const options: RazorpayOptions = {
          key: "rzp_test_i3wlvYKStkUFLU",
          amount: paymentData.amount,
          currency: paymentData.currency,
          order_id: paymentData.orderId || "",
          name: "Craft Bihar",
          description: `Payment for your order ${paymentData.orderId} of ${paymentData.amount}`,
          handler: async (response) => {
            try {
              // Step 3: Verify payment
              const { data: verifyData } = await paymentApi.verifyPayment({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
              console.log("🚀 ~ handlePayment ~ verifyData:", verifyData);
              if (verifyData.status === "success") {
                toast.success("Payment successful!");
                setShowSuccessAnimation(true);
                // Navigate to order page after 2 seconds
                setTimeout(() => {
                  router.push("/orders");
                }, 2000);
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
      } else {
        // For cash on delivery, just show success message
        toast.success("Order placed successfully!");
        setShowSuccessAnimation(true);
        // Navigate to order page after 2 seconds
        setTimeout(() => {
          router.push("/orders");
        }, 2000);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    showSuccessAnimation,
    handlePayment,
  };
}
