import { Order } from "@/types/order";
import {
  Package2,
  CheckCircle,
  Loader2,
  PackageCheck,
  Truck,
  XCircle,
  Undo2,
  DollarSign,
} from "lucide-react";

type OrderStatus = Order["status"];

interface StatusConfig {
  label: string;
  color: string;
}

export const orderStatusConfig: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800",
  },
  processing: {
    label: "Processing",
    color: "bg-purple-100 text-purple-800",
  },
  ready_for_pickup: {
    label: "Ready for Pickup",
    color: "bg-indigo-100 text-indigo-800",
  },
  shipped: {
    label: "Shipped",
    color: "bg-blue-100 text-blue-800",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "bg-orange-100 text-orange-800",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
  },
  returned: {
    label: "Returned",
    color: "bg-gray-100 text-gray-800",
  },
  refunded: {
    label: "Refunded",
    color: "bg-gray-100 text-gray-800",
  },
};

export const getOrderStatusConfig = (status: OrderStatus): StatusConfig => {
  return orderStatusConfig[status];
};

export const isOrderCancellable = (status: OrderStatus): boolean => {
  return ["pending", "confirmed", "processing"].includes(status);
};

export const ORDER_STATUS_STEPS = [
  { key: "pending", label: "Order Placed", icon: Package2 },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "processing", label: "Processing", icon: Loader2 },
  { key: "ready_for_pickup", label: "Ready for Pickup", icon: PackageCheck },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
  { key: "cancelled", label: "Cancelled", icon: XCircle },
  { key: "returned", label: "Returned", icon: Undo2 },
  { key: "refunded", label: "Refunded", icon: DollarSign },
];

export const ORDER_STATUS_DESCRIPTIONS: Record<string, string> = {
  pending: "Your order has been placed successfully.",
  confirmed: "Your order has been confirmed.",
  processing: "Your order is being processed.",
  ready_for_pickup: "Your order is ready for pickup.",
  shipped: "Your order has been shipped.",
  out_for_delivery: "Your order is out for delivery.",
  delivered: "Your order has been delivered successfully.",
  cancelled: "Your order has been cancelled.",
  returned: "Your order has been returned.",
  refunded: "Your order has been refunded.",
};
