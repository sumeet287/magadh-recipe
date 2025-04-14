import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package2,
  IndianRupee,
  Calendar,
  MapPin,
  X,
  RefreshCw,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { Order } from "@/types/order";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderCardProps {
  order: Order;
  expandedOrder: string | null;
  onToggleExpansion: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onReorder: (order: Order) => void;
  isLoading: boolean;
}

export function OrderCard({
  order,
  expandedOrder,
  onToggleExpansion,
  onCancelOrder,
  onReorder,
  isLoading,
}: Readonly<OrderCardProps>) {
  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

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
              <CardTitle className="text-lg">Order #{order.id}</CardTitle>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(order.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
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
                  onClick={() => onCancelOrder(order.id)}
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
                key={item.id}
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
                  {order.shippingAddress}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center text-gray-600">
                  <Package2 className="w-4 h-4 mr-1" />
                  Order Total:
                </div>
                <div className="flex items-center font-medium text-lg text-orange-600">
                  <IndianRupee className="w-4 h-4" />
                  {order.total.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
            {order.trackingInfo && (
              <div className="mt-4">
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between"
                  onClick={() => onToggleExpansion(order.id)}
                  disabled={isLoading}
                >
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Track Order
                  </div>
                  <span className="text-sm text-gray-500">
                    {expandedOrder === order.id ? "Hide" : "Show"} Details
                  </span>
                </Button>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    {order.trackingInfo.map((track) => (
                      <div
                        key={`${order.id}-${track.timestamp}`}
                        className="flex gap-4 p-3 rounded-lg bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{track.status}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(track.timestamp).toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {track.description}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Location: {track.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusMessages = {
  pending: "Order Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
