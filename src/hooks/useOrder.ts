"use client";

import { useCallback } from "react";
import { api } from "@/lib/axios";
import { orderEndpoints } from "@/lib/endpoints/orders";
import { toast } from "sonner";

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    productImage: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  addressId: string;
  paymentMethod: string;
}

interface UpdateOrderStatusRequest {
  status: "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber?: string;
}

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: {
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

interface CheckoutRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  addressId: string;
  paymentMethod: string;
}

export function useOrder() {
  // Create a new order
  const createOrder = useCallback(async (request: CreateOrderRequest) => {
    try {
      const { data } = await api.post<Order>(
        orderEndpoints.createOrder,
        request
      );
      toast.success("Order placed successfully");
      return data;
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to place order");
      throw error;
    }
  }, []);

  // Get all orders for the current user
  const getUserOrders = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await api.get<any[]>(orderEndpoints.getUserOrders);
      return data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders");
      throw error;
    }
  }, []);

  // Get a specific order by ID
  const getOrderById = useCallback(async (orderId: string) => {
    try {
      const { data } = await api.get<Order>(
        orderEndpoints.getOrderById.replace(":id", orderId)
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch order:", error);
      toast.error("Failed to fetch order details");
      throw error;
    }
  }, []);

  // Update order status (Admin only)
  const updateOrderStatus = useCallback(
    async (orderId: string, request: UpdateOrderStatusRequest) => {
      try {
        const { data } = await api.patch<Order>(
          orderEndpoints.updateOrderStatus.replace(":id", orderId),
          request
        );
        toast.success("Order status updated successfully");
        return data;
      } catch (error) {
        console.error("Failed to update order status:", error);
        toast.error("Failed to update order status");
        throw error;
      }
    },
    []
  );

  // Get order statistics (Admin only)
  const getOrderStats = useCallback(async () => {
    try {
      const { data } = await api.get<OrderStats>(orderEndpoints.getOrderStats);
      return data;
    } catch (error) {
      console.error("Failed to fetch order stats:", error);
      toast.error("Failed to fetch order statistics");
      throw error;
    }
  }, []);

  // Error handler utility
  const handleOrderError = useCallback((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    toast.error(message);
    return { error: message };
  }, []);

  // Complete checkout flow
  const checkout = useCallback(
    async (request: CheckoutRequest) => {
      try {
        // Step 1: Create order
        const order = await createOrder(request);
        return order;
      } catch (error) {
        console.error("Checkout failed:", error);
        toast.error("Checkout failed. Please try again.");
        throw error;
      }
    },
    [createOrder]
  );

  return {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    getOrderStats,
    handleOrderError,
    checkout,
  };
}
