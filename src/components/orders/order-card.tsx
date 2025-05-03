import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package2,
  IndianRupee,
  MapPin,
  X,
  RefreshCw,
  Truck,
  Loader2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { Order as OrderType } from "@/types/order";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayment } from "@/hooks/usePayment";
import { useOrder } from "@/hooks/useOrder";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

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
  const { handlePayment, isProcessing } = usePayment();
  const { getOrderById } = useOrder();

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const handlePayNow = async () => {
    try {
      await handlePayment(order._id, "online");
      // Payment successful hone ke baad order status refresh karta hai
      const updatedOrder = await getOrderById(order._id);
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
      onToggleExpansion(order._id);
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  // Get tracking progress based on status
  const getTrackingProgress = () => {
    switch (order.status) {
      case "pending":
        return 10;
      case "processing":
        return 35;
      case "shipped":
        return 70;
      case "delivered":
        return 100;
      case "cancelled":
        return 100;
      default:
        return 0;
    }
  };

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
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">
                  Order #{order._id.substring(0, 8)}...
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={`${statusColors[order.status]} px-3 py-1`}
                >
                  {statusMessages[order.status]}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                <span>
                  Ordered on: {new Date().toLocaleDateString("en-IN")}
                </span>
                <span className="mx-2">•</span>
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>Est. Delivery: {getEstimatedDelivery()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {order.status !== "cancelled" && order.status !== "delivered" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCancelOrder(order._id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              )}
              {order.status === "delivered" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReorder(order)}
                  disabled={isLoading}
                  className="hover:bg-amber-50"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Reorder
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.items.slice(0, 3).map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                    <Image
                      src={item.image || "/placeholder.svg?height=64&width=64"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <div className="flex items-center text-sm font-medium text-amber-600">
                      <IndianRupee className="w-3.5 h-3.5 mr-1" />
                      {item.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="flex items-center justify-center p-3 rounded-lg bg-gray-50 border border-dashed">
                  <span className="text-sm text-gray-500">
                    +{order.items.length - 3} more items
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  Delivery Address:
                </div>
                <div className="text-right max-w-[60%] text-sm">
                  {order.shippingAddress.name}, {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center text-gray-600">
                  <Package2 className="w-4 h-4 mr-1" />
                  Order Total:
                </div>
                <div className="flex items-center font-medium text-lg text-amber-600">
                  <IndianRupee className="w-4 h-4" />
                  {order.totalAmount.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full flex items-center justify-between hover:bg-amber-50"
              onClick={() => onToggleExpansion(order._id)}
              disabled={isLoading}
            >
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                Track Order
              </div>
              <span className="flex items-center text-sm text-amber-600">
                {expandedOrder === order._id ? (
                  <>
                    Hide Details <ChevronUp className="ml-1 w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show Details <ChevronDown className="ml-1 w-4 h-4" />
                  </>
                )}
              </span>
            </Button>

            {expandedOrder === order._id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-gray-50 rounded-lg border"
              >
                <h4 className="font-medium mb-4">Order Tracking</h4>
                <div className="mb-6">
                  <Progress value={getTrackingProgress()} className="h-2" />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Order Placed</span>
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.status !== "cancelled" && (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500"></div>
                        <div>
                          <p className="text-sm font-medium">Order Placed</p>
                          <p className="text-xs text-gray-500">
                            Your order has been placed successfully
                          </p>
                        </div>
                      </div>

                      {["processing", "shipped", "delivered"].includes(
                        order.status
                      ) && (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500"></div>
                          <div>
                            <p className="text-sm font-medium">
                              Order Processing
                            </p>
                            <p className="text-xs text-gray-500">
                              Your order is being processed
                            </p>
                          </div>
                        </div>
                      )}

                      {["shipped", "delivered"].includes(order.status) && (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500"></div>
                          <div>
                            <p className="text-sm font-medium">Order Shipped</p>
                            <p className="text-xs text-gray-500">
                              Your order has been shipped
                            </p>
                          </div>
                        </div>
                      )}

                      {order.status === "delivered" && (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500"></div>
                          <div>
                            <p className="text-sm font-medium">
                              Order Delivered
                            </p>
                            <p className="text-xs text-gray-500">
                              Your order has been delivered successfully
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {order.status === "cancelled" && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500"></div>
                      <div>
                        <p className="text-sm font-medium">Order Cancelled</p>
                        <p className="text-xs text-gray-500">
                          Your order has been cancelled
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>

        {order.status === "pending" && (
          <CardFooter className="flex gap-2 bg-gradient-to-r from-amber-50 to-amber-100/30 border-t">
            <Button
              variant="outline"
              className="flex-1 hover:bg-white"
              onClick={() => onCancelOrder(order._id)}
              disabled={isLoading}
            >
              Cancel Order
            </Button>
            <Button
              className="flex-1 bg-amber-600 hover:bg-amber-700"
              onClick={handlePayNow}
              disabled={isLoading || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}

const statusColors: { [key: string]: string } = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusMessages: { [key: string]: string } = {
  pending: "Order Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
