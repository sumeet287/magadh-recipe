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
import { Check, ChevronLeft, CreditCard, MapPin, Package } from "lucide-react";
import Link from "next/link";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethodForm from "@/components/checkout/PaymentMethodForm";
import ReviewOrder from "@/components/checkout/ReviewOrder";
import OrderSummarySidebar from "@/components/checkout/OrderSummarySidebar";
import { OrderSuccessAnimation } from "@/components/oder-success-animation/OrderSuccessAnimation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { checkout } = useOrder();
  const { handlePayment, showSuccessAnimation } = usePayment();
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
  const [activeStep, setActiveStep] = useState<
    "shipping" | "payment" | "review"
  >("shipping");

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

  if (showSuccessAnimation) {
    return <OrderSuccessAnimation />;
  }

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
    <div>
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-10">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-base font-medium text-brand-muted hover:text-brand-dark transition-colors mb-4 sm:mb-0"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Cart
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center flex-1 text-brand-accent tracking-tight font-sans">
            Secure Checkout
            <p className="text-brand-muted font-medium text-xs sm:text-sm">
              Complete your purchase of authentic Bihar handicrafts
            </p>
          </h1>
        </div>

        {/* Checkout Progress */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div
                className={`group relative flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full border-2 ${
                  activeStep === "shipping"
                    ? "border-[#D84315] bg-[#D84315] text-white"
                    : "border-[#D84315] bg-white text-[#D84315]"
                } transition-all duration-300`}
              >
                {activeStep !== "shipping" && (
                  <div className="absolute -right-1 -top-1 flex h-4 sm:h-6 w-4 sm:w-6 items-center justify-center rounded-full bg-[#4CAF50] text-white">
                    <Check className="h-3 sm:h-4 w-3 sm:w-4" />
                  </div>
                )}
                <MapPin className="h-5 sm:h-7 w-5 sm:w-7" />
                <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#D84315]"></div>
              </div>
              <span className="mt-2 sm:mt-3 text-sm sm:text-base font-medium text-[#5D3A1E]">
                Shipping
              </span>
            </div>
            <div
              className={`relative h-0.5 w-12 sm:w-20 md:w-40 ${
                activeStep === "shipping"
                  ? "bg-[#E8D0B0]"
                  : "bg-gradient-to-r from-[#D84315] to-[#F4511E]"
              }`}
            >
              {activeStep !== "shipping" && (
                <div className="absolute -top-1 h-2 w-full bg-[url('/dotted-line.png')] bg-repeat-x opacity-50 transition-all duration-300"></div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`group relative flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full border-2 ${
                  activeStep === "payment"
                    ? "border-[#D84315] bg-[#D84315] text-white"
                    : activeStep === "review"
                    ? "border-[#D84315] bg-white text-[#D84315]"
                    : "border-[#8C6239] bg-white text-[#8C6239]"
                } transition-all duration-300`}
              >
                {activeStep === "review" && (
                  <div className="absolute -right-1 -top-1 flex h-4 sm:h-6 w-4 sm:w-6 items-center justify-center rounded-full bg-[#4CAF50] text-white">
                    <Check className="h-3 sm:h-4 w-3 sm:w-4" />
                  </div>
                )}
                <CreditCard className="h-5 sm:h-7 w-5 sm:w-7" />
                {activeStep !== "shipping" && (
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#D84315]"></div>
                )}
              </div>
              <span
                className={`mt-2 sm:mt-3 text-sm sm:text-base font-medium ${
                  activeStep === "shipping"
                    ? "text-[#8C6239]"
                    : "text-[#5D3A1E]"
                }`}
              >
                Payment
              </span>
            </div>
            <div
              className={`relative h-0.5 w-12 sm:w-20 md:w-40 ${
                activeStep === "review"
                  ? "bg-gradient-to-r from-[#F4511E] to-[#D84315]"
                  : "bg-[#E8D0B0]"
              }`}
            >
              {activeStep === "review" && (
                <div className="absolute -top-1 h-2 w-full bg-[url('/dotted-line.png')] bg-repeat-x opacity-50"></div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`group relative flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full border-2 ${
                  activeStep === "review"
                    ? "border-[#D84315] bg-[#D84315] text-white"
                    : "border-[#8C6239] bg-white text-[#8C6239]"
                }`}
              >
                <Package className="h-5 sm:h-7 w-5 sm:w-7" />
                {activeStep === "review" && (
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#D84315]"></div>
                )}
              </div>
              <span
                className={`mt-2 sm:mt-3 text-sm sm:text-base font-medium ${
                  activeStep === "review" ? "text-[#5D3A1E]" : "text-[#8C6239]"
                }`}
              >
                Review
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-8 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs value={activeStep} className="w-full">
              <TabsContent value="shipping" className="mt-0">
                <ShippingForm
                  addresses={addresses.map((addr) => ({
                    ...addr,
                    id: addr._id,
                  }))}
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

          <div className="lg:col-span-1">
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
    </div>
  );
}
