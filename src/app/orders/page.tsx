"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Order } from "@/types/order";
import { OrderCard } from "@/components/orders/order-card";
import { OrderCardSkeleton } from "@/components/orders/order-card-skeleton";
import { OrdersHeader } from "@/components/orders/orders-header";
import { EmptyOrders } from "@/components/orders/empty-orders";
import { useOrder } from "@/hooks/useOrder";

export default function OrdersPage() {
  const router = useRouter();
  const { getUserOrders } = useOrder();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check if user is authenticated in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    // Check for offline mode
    const handleOffline = () => {
      setIsOffline(true);
      toast.warning("You are offline. Showing cached orders.");
    };

    const handleOnline = () => {
      setIsOffline(false);
      toast.success("Back online!");
      fetchOrders();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Check initial online status
    setIsOffline(!navigator.onLine);

    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        if (!isOffline) {
          const apiOrders = await getUserOrders();
          setOrders(apiOrders);
          localStorage.setItem("cachedOrders", JSON.stringify(apiOrders));
        } else {
          // Try to get cached orders first
          const cachedOrders = localStorage.getItem("cachedOrders");
          if (cachedOrders) {
            setOrders(JSON.parse(cachedOrders));
          }
        }
      } catch (error) {
        console.error("Failed to load orders", error);
        toast.error("Failed to load orders");
        // Try to load cached orders on error
        const cachedOrders = localStorage.getItem("cachedOrders");
        if (cachedOrders) {
          setOrders(JSON.parse(cachedOrders));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [router, isOffline, getUserOrders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const handleCancelOrder = async (orderId: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel order", error);
      toast.error("Failed to cancel order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReorder = async (order: Order) => {
    try {
      console.log("Reordering order:", order);
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // TODO: this would add items to cart
      toast.success("Items added to cart successfully");
    } catch (error) {
      console.error("Failed to add items to cart", error);
      toast.error("Failed to add items to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isOffline && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>You are offline. Showing cached orders.</span>
          </div>
        )}

        <OrdersHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          isLoading={isLoading}
          isOffline={isOffline}
        />

        <div className="space-y-6">
          {isLoading ? (
            <>
              <OrderCardSkeleton />
              <OrderCardSkeleton />
              <OrderCardSkeleton />
            </>
          ) : (
            <>
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onCancelOrder={handleCancelOrder}
                  onToggleExpansion={toggleOrderExpansion}
                  onReorder={handleReorder}
                  isLoading={isLoading}
                  expandedOrder={expandedOrder}
                />
              ))}
              {filteredOrders.length === 0 && (
                <EmptyOrders
                  hasSearchQuery={!!searchQuery || statusFilter !== "all"}
                />
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
