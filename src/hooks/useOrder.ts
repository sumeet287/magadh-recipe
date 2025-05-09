"use client";

import { useCallback } from "react";
import { api } from "@/lib/axios";
import { orderEndpoints } from "@/lib/endpoints/orders";
import { toast } from "sonner";
import {
  Order,
  CreateOrderRequest,
  CheckoutRequest,
  UpdateOrderStatusRequest,
  UpdatePaymentStatusRequest,
  OrderStats,
} from "@/types/order";

export function useOrder() {
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

  // New function to update payment status
  const updatePaymentStatus = useCallback(
    async (orderId: string, request: UpdatePaymentStatusRequest) => {
      try {
        const { data } = await api.patch<Order>(
          orderEndpoints.updatePaymentStatus.replace(":id", orderId),
          request
        );
        toast.success("Payment status updated successfully");
        return data;
      } catch (error) {
        console.error("Failed to update payment status:", error);
        toast.error("Failed to update payment status");
        throw error;
      }
    },
    []
  );

  // Updated updateOrderStatus function with tracking info
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

  // Updated checkout flow with payment handling
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

  // Rest of the functions remain same
  const getUserOrders = useCallback(async () => {
    try {
      const { data } = await api.get<Order[]>(orderEndpoints.getUserOrders);
      return data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders");
      throw error;
    }
  }, []);

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

  const cancelOrder = useCallback(async (orderId: string, note?: string) => {
    try {
      const { data } = await api.patch<Order>(
        orderEndpoints.cancelOrder.replace(":id", orderId),
        { note }
      );
      toast.success("Order cancelled successfully");
      return data;
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order");
      throw error;
    }
  }, []);

  const handleOrderError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message);
      return { error: error.message };
    }

    // Handle API error responses
    if (error && typeof error === "object" && "response" in error) {
      const apiError = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        apiError.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      return { error: errorMessage };
    }

    // Default error
    const defaultMessage = "An unexpected error occurred";
    toast.error(defaultMessage);
    return { error: defaultMessage };
  }, []);

  return {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
    getOrderStats,
    handleOrderError,
    checkout,
    cancelOrder,
  };
}
