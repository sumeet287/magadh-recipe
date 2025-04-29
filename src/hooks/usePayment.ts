import { useState } from "react";
import { toast } from "sonner";
import { paymentEndpoints } from "@/lib/endpoints/payment";

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (orderId: string) => {
    try {
      setIsProcessing(true);

      // Step 1: Create payment order
      const { data: paymentData } = await paymentEndpoints.createOrder(orderId);

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: paymentData.amount,
        currency: paymentData.currency,
        order_id: paymentData.orderId,
        name: "Bihar Bazaar",
        description: "Order Payment",
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // Step 3: Verify payment
            const { data: verifyData } = await paymentEndpoints.verifyPayment({
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
            toast.error("Payment verification failed");
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
      toast.error("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handlePayment,
    isProcessing,
  };
}
