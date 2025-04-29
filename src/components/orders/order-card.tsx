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
} from "lucide-react";
import Image from "next/image";
import { Order as OrderType } from "@/types/order";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayment } from "@/hooks/usePayment";
import { useOrder } from "@/hooks/useOrder";
import { toast } from "sonner";

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
      await handlePayment(order._id);
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-lg">Order #{order._id}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`${statusColors[order.status]} px-3 py-1`}
              >
                {statusMessages[order.status]}
              </Badge>
              {order.status !== "cancelled" && order.status !== "delivered" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCancelOrder(order._id)}
                  className="text-red-600 hover:text-red-700"
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
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Reorder
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-50"
              >
                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <div className="flex items-center text-sm font-medium text-orange-600">
                    <IndianRupee className="w-3.5 h-3.5 mr-1" />
                    {item.price.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  Delivery Address:
                </div>
                <div className="text-right max-w-[60%]">
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
                <div className="flex items-center font-medium text-lg text-orange-600">
                  <IndianRupee className="w-4 h-4" />
                  {order.totalAmount.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between"
              onClick={() => onToggleExpansion(order._id)}
              disabled={isLoading}
            >
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                Track Order
              </div>
              <span className="text-sm text-gray-500">
                {expandedOrder === order._id ? "Hide" : "Show"} Details
              </span>
            </Button>
            {expandedOrder === order._id && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  Tracking details coming soon...
                </div>
              </div>
            )}
          </div>
        </CardContent>
        {order.status === "pending" && (
          <CardFooter className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onCancelOrder(order._id)}
              disabled={isLoading}
            >
              Cancel Order
            </Button>
            <Button
              className="flex-1"
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
