"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { useOrder } from "@/hooks/useOrder";
import { usePayment } from "@/hooks/usePayment";
import { useAddresses } from "@/hooks/useAddresses";
import { toast } from "sonner";
import {
  AddressDialog,
  type AddressFormData,
} from "@/components/products/address-dialog";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, CreditCard, MapPin, Package } from "lucide-react";
import Link from "next/link";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethodForm from "@/components/checkout/PaymentMethodForm";
import ReviewOrder from "@/components/checkout/ReviewOrder";
import OrderSummarySidebar from "@/components/checkout/OrderSummarySidebar";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { checkout } = useOrder();
  const { handlePayment } = usePayment();
  const { addresses, isLoading, createAddress } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash_on_delivery" | "online"
  >("online");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const router = useRouter();

  // Checkout flow state
  const [activeStep, setActiveStep] = useState<string>("shipping");

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate discount and final total
  const discountAmount = appliedCoupon
    ? Math.round((cartTotal * appliedCoupon.discountPercent) / 100)
    : 0;
  const finalTotal = cartTotal - discountAmount;

  useEffect(() => {
    if (!isLoading && addresses.length === 0) {
      setIsAddressDialogOpen(true);
    }
  }, [isLoading, addresses]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const selectedAddress = addresses.find(
        (addr) => addr._id === selectedAddressId
      );
      if (!selectedAddress) {
        toast.error("Selected address not found");
        return;
      }

      // Create order
      const order = await checkout({
        items: orderItems,
        addressId: selectedAddressId,
        paymentMethod,
        // notes: deliveryNotes,
      });

      // If payment method is Razorpay, handle payment
      if (paymentMethod === "online") {
        await handlePayment(order._id, paymentMethod);
      } else {
        // For COD, just clear cart and redirect
        clearCart();
        toast.success(
          "Order placed successfully! Redirecting to your orders..."
        );
        setTimeout(() => {
          router.push("/orders");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order");
    }
  };

  const handleAddNewAddress = async (addressData: AddressFormData) => {
    try {
      const newAddress = await createAddress(addressData);
      setSelectedAddressId(newAddress._id);
      setIsAddressDialogOpen(false);
    } catch (error) {
      console.error("Failed to add new address:", error);
    }
  };

  const handleNextStep = () => {
    if (activeStep === "shipping") {
      if (!selectedAddressId) {
        toast.error("Please select a shipping address");
        return;
      }
      setActiveStep("payment");
    } else if (activeStep === "payment") {
      setActiveStep("review");
    }
  };

  const handlePreviousStep = () => {
    if (activeStep === "payment") {
      setActiveStep("shipping");
    } else if (activeStep === "review") {
      setActiveStep("payment");
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode) return;

    setIsApplyingCoupon(true);
    setCouponError("");

    // Simulate API call to validate coupon
    setTimeout(() => {
      // Demo coupon codes: BIHAR10 (10% off), CRAFT20 (20% off)
      if (couponCode.toUpperCase() === "BIHAR10") {
        setAppliedCoupon({ code: "BIHAR10", discountPercent: 10 });
        toast.success("Coupon applied: 10% discount");
      } else if (couponCode.toUpperCase() === "CRAFT20") {
        setAppliedCoupon({ code: "CRAFT20", discountPercent: 20 });
        toast.success("Coupon applied: 20% discount");
      } else {
        setCouponError("Invalid or expired coupon code");
        setAppliedCoupon(null);
      }
      setIsApplyingCoupon(false);
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  const selectedAddress = addresses.find(
    (addr) => addr._id === selectedAddressId
  );

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="flex items-center mb-10">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-base font-medium text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Cart
        </Link>
        <h1 className="text-4xl font-extrabold text-center flex-1 text-brand-accent tracking-tight font-sans">
          Secure Checkout
        </h1>
      </div>

      {/* Checkout Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-center max-w-3xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setActiveStep("shipping")}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-brand shadow-lg ${
                activeStep === "shipping"
                  ? "bg-brand text-white"
                  : "bg-brand/10 text-brand cursor-pointer"
              } transition-all duration-300`}
              aria-label="Go to shipping step"
            >
              <MapPin className="h-6 w-6" />
            </button>
            <span className="text-base mt-2 font-semibold font-sans">
              Shipping
            </span>
          </div>
          <div className="h-1 flex-1 bg-brand-border mx-2 md:mx-4 rounded-full">
            <div
              className={`h-full bg-brand rounded-full ${
                activeStep === "shipping"
                  ? "w-0"
                  : activeStep === "payment"
                  ? "w-1/2"
                  : "w-full"
              } transition-all duration-300`}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() =>
                activeStep === "review" || activeStep === "payment"
                  ? setActiveStep("payment")
                  : null
              }
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-brand shadow-lg ${
                activeStep === "payment"
                  ? "bg-brand text-white"
                  : activeStep === "review"
                  ? "bg-brand/10 text-brand cursor-pointer"
                  : "bg-brand-border text-brand-muted"
              } transition-all duration-300`}
              disabled={activeStep === "shipping"}
              aria-label="Go to payment step"
            >
              <CreditCard className="h-6 w-6" />
            </button>
            <span className="text-base mt-2 font-semibold font-sans">
              Payment
            </span>
          </div>
          <div className="h-1 flex-1 bg-brand-border mx-2 md:mx-4 rounded-full">
            <div
              className={`h-full bg-brand rounded-full ${
                activeStep === "review" ? "w-full" : "w-0"
              } transition-all duration-300`}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() =>
                activeStep === "review" ? setActiveStep("review") : null
              }
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-brand shadow-lg ${
                activeStep === "review"
                  ? "bg-brand text-white"
                  : "bg-brand-border text-brand-muted"
              } transition-all duration-300`}
              disabled={activeStep === "shipping" || activeStep === "payment"}
              aria-label="Go to review step"
            >
              <Package className="h-6 w-6" />
            </button>
            <span className="text-base mt-2 font-semibold font-sans">
              Review
            </span>
          </div>
        </div>
        {/* Mobile step indicator */}
        <div className="mt-6 text-center md:hidden">
          <p className="text-base font-semibold font-sans">
            Step{" "}
            {activeStep === "shipping"
              ? "1"
              : activeStep === "payment"
              ? "2"
              : "3"}{" "}
            of 3:
            <span className="ml-1 text-brand">
              {activeStep === "shipping"
                ? "Shipping Information"
                : activeStep === "payment"
                ? "Payment Method"
                : "Review Order"}
            </span>
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs value={activeStep} className="w-full">
            <TabsContent value="shipping" className="mt-0">
              <ShippingForm
                addresses={addresses.map((addr) => ({ ...addr, id: addr._id }))}
                selectedAddressId={selectedAddressId}
                setSelectedAddressId={setSelectedAddressId}
                handleAddNewAddress={handleAddNewAddress}
                deliveryNotes={deliveryNotes}
                setDeliveryNotes={setDeliveryNotes}
                handleNextStep={handleNextStep}
                isAddressDialogOpen={isAddressDialogOpen}
                setIsAddressDialogOpen={setIsAddressDialogOpen}
              />
            </TabsContent>

            <TabsContent value="payment" className="mt-0">
              <PaymentMethodForm
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
              />
            </TabsContent>

            <TabsContent value="review" className="mt-0">
              <ReviewOrder
                cart={cart}
                cartTotal={cartTotal}
                selectedAddress={selectedAddress}
                deliveryNotes={deliveryNotes}
                paymentMethod={paymentMethod}
                handlePlaceOrder={handlePlaceOrder}
                handlePreviousStep={handlePreviousStep}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <OrderSummarySidebar
            cart={cart}
            cartTotal={cartTotal}
            appliedCoupon={appliedCoupon}
            discountAmount={discountAmount}
            finalTotal={finalTotal}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            handleApplyCoupon={handleApplyCoupon}
            couponError={couponError}
            isApplyingCoupon={isApplyingCoupon}
          />
        </div>
      </div>

      <AddressDialog
        open={isAddressDialogOpen}
        onOpenChange={setIsAddressDialogOpen}
        onSave={handleAddNewAddress}
        mode="add"
      />
    </div>
  );
}
