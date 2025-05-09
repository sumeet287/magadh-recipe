"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IndianRupee,
  MapPin,
  RefreshCw,
  Truck,
  Loader2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import type { Order as OrderType } from "@/types/order";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayment } from "@/hooks/usePayment";
import { useOrder } from "@/hooks/useOrder";
import { toast } from "sonner";
import {
  getOrderStatusConfig,
  isOrderCancellable,
  ORDER_STATUS_DESCRIPTIONS,
  ORDER_STATUS_STEPS,
} from "@/utils/order.utils";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: OrderType;
  expandedOrder: string | null;
  onToggleExpansion: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onReorder: (order: OrderType) => void;
  onOrderUpdate: (updatedOrder: OrderType) => void;
  isLoading: boolean;
}

export function OrderCard({
  order,
  expandedOrder,
  onToggleExpansion,
  onCancelOrder,
  onReorder,
  onOrderUpdate,
  isLoading,
}: Readonly<OrderCardProps>) {
  console.log("🚀 ~ OrderCard ~ order:", order);
  const { handlePayment, isProcessing } = usePayment();
  const { getOrderById } = useOrder();
  const statusConfig = getOrderStatusConfig(order.status);
  const canCancel = isOrderCancellable(order.status);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  const handlePayNow = async () => {
    try {
      await handlePayment(order._id, "online");
      // Refresh order status after successful payment
      const updatedOrder = await getOrderById(order._id);
      console.log("🚀 ~ handlePayNow ~ updatedOrder:", updatedOrder);
      if (!updatedOrder) {
        throw new Error("Failed to fetch updated order");
      }

      // Convert the updated order to match the OrderType
      const convertedOrder: OrderType = {
        _id: updatedOrder._id,
        status: updatedOrder.status,
        totalAmount: updatedOrder.totalAmount,
        totalItems: updatedOrder.items?.length || 0,
        paymentMethod: updatedOrder.paymentMethod,
        shippingAddress: {
          name: updatedOrder.shippingAddress?.street || "",
          address: updatedOrder.shippingAddress?.street || "",
          city: updatedOrder.shippingAddress?.city || "",
          state: updatedOrder.shippingAddress?.state || "",
          pincode: updatedOrder.shippingAddress?.postalCode || "",
          country: updatedOrder.shippingAddress?.country || "",
          landmark: "",
          isDefault: false,
          _id: "",
        },
        items: (updatedOrder.items || []).map((item) => ({
          productId: item.product?._id || "",
          quantity: item.quantity || 0,
          price: item.price || 0,
          name: item.product?.name || "",
          category: "",
          image: item.product?.productImage || "",
        })),
        userId: updatedOrder.userId,
        __v: 0,
      };

      // Update the order in the parent component
      onOrderUpdate(convertedOrder);
      toast.success("Payment successful! Your order is being processed.");
      onToggleExpansion(order._id);
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const currentStepIndex = ORDER_STATUS_STEPS.findIndex(
    (step) => step.key === order.status
  );
  const progressPercent =
    currentStepIndex === -1
      ? 0
      : ((currentStepIndex + 1) / ORDER_STATUS_STEPS.length) * 100;

  // Get estimated delivery date (mock data)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);

    if (order.status === "delivered") {
      return "Delivered";
    } else if (order.status === "cancelled") {
      return "Cancelled";
    } else {
      // Add 5 days for delivery
      deliveryDate.setDate(today.getDate() + 5);
      return deliveryDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  // Format order ID for better readability
  const formatOrderId = (id: string) => {
    return id.substring(0, 8).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden border-amber-100 transition-all duration-300 hover:border-amber-200 hover:shadow-md">
        <CardHeader className="pb-4 bg-gradient-to-r from-amber-50 to-amber-100/30">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-bold">
                  Order #{formatOrderId(order._id)}
                </CardTitle>
                <Badge
                  className={cn("text-xs font-medium", statusConfig.color)}
                >
                  {statusConfig.label}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-y-1 text-sm text-muted-foreground">
                <div className="flex items-center mr-3">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  <span>
                    Ordered on: {new Date().toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  <span>Est. Delivery: {getEstimatedDelivery()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {canCancel && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCancelOrder(order._id)}
                  disabled={isLoading}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                  Cancel Order
                </Button>
              )}
              {order.status === "pending" &&
                (!order.paymentDetails ||
                  order.paymentDetails.status !== "completed") && (
                  <Button
                    size="sm"
                    onClick={handlePayNow}
                    disabled={isLoading || isProcessing}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                        Pay Now
                      </>
                    )}
                  </Button>
                )}
              {order.status === "delivered" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReorder(order)}
                  disabled={isLoading}
                  className="border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Reorder
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="space-y-5">
            {/* Order Summary */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50/50 border border-amber-100">
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-amber-600" />
                <span className="font-medium">
                  {order.totalItems} {order.totalItems === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="flex items-center font-medium text-lg text-amber-700">
                <IndianRupee className="w-4 h-4" />
                {order.totalAmount.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Product Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {order.items.slice(0, 3).map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border bg-white flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                    <div className="flex items-center text-sm font-medium text-amber-700 mt-1">
                      <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                      {item.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}
              {order.items.length > 3 && (
                <div
                  className="flex items-center justify-center p-3 rounded-lg bg-gray-50 border border-dashed border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onToggleExpansion(order._id)}
                >
                  <span className="text-sm text-gray-600 font-medium">
                    +{order.items.length - 3} more items
                  </span>
                </div>
              )}
            </div>

            {/* Delivery Address */}
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Delivery Address
                  </div>
                  <div className="text-sm text-gray-600 mt-0.5">
                    {order.shippingAddress.name},{" "}
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    - {order.shippingAddress.pinCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Track Order Button */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-between border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
              onClick={() => onToggleExpansion(order._id)}
              disabled={isLoading}
            >
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                {expandedOrder === order._id
                  ? "Hide Tracking Details"
                  : "Track Order"}
              </div>
              <span>
                {expandedOrder === order._id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            </Button>

            {/* Order Tracking Details (Expanded) */}
            {expandedOrder === order._id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-gray-50 rounded-lg border"
              >
                <h4 className="font-medium mb-4 flex items-center text-amber-800">
                  <Truck className="w-4 h-4 mr-2" />
                  Order Tracking Status
                </h4>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "absolute h-2.5 rounded-full transition-all duration-500",
                        order.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-amber-600"
                      )}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Status Labels */}
                  <div className="flex justify-between mt-2 text-xs">
                    {ORDER_STATUS_STEPS.map((step, idx) => (
                      <div
                        key={step.key}
                        className={cn(
                          "text-center px-1",
                          idx <= currentStepIndex
                            ? order.status === "cancelled"
                              ? "font-semibold text-red-600"
                              : "font-semibold text-amber-700"
                            : "text-gray-400"
                        )}
                      >
                        {step.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="space-y-4 pl-1">
                  {ORDER_STATUS_STEPS.slice(0, currentStepIndex + 1).map(
                    (step) => {
                      const Icon = step.icon;
                      return (
                        <div className="flex items-start gap-3" key={step.key}>
                          <div
                            className={cn(
                              "rounded-full p-1.5",
                              step.key === "cancelled"
                                ? "bg-red-100 text-red-500"
                                : step.key === order.status
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-500"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p
                              className={cn(
                                "text-sm font-medium",
                                step.key === "cancelled"
                                  ? "text-red-600"
                                  : step.key === order.status
                                  ? "text-green-700"
                                  : "text-gray-700"
                              )}
                            >
                              {step.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {ORDER_STATUS_DESCRIPTIONS[step.key]}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date().toLocaleString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* Help Text */}
                {order.status !== "cancelled" &&
                  order.status !== "delivered" && (
                    <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-100 text-sm text-amber-700">
                      <p className="flex items-start">
                        <InfoIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Your order is on its way! You&apos;ll receive updates as
                        your order progresses.
                      </p>
                    </div>
                  )}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
