"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { Order } from "@/types/order";
import { OrderCard } from "@/components/orders/order-card";
import { OrderCardSkeleton } from "@/components/orders/order-card-skeleton";
import { OrdersHeader } from "@/components/orders/orders-header";
import { EmptyOrders } from "@/components/orders/empty-orders";
import { useOrder } from "@/hooks/useOrder";
import { WifiOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function OrdersPage() {
  const router = useRouter();
  const { getUserOrders, cancelOrder } = useOrder();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Cancel modal state
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

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

  const handleCancelClick = (orderId: string) => {
    setOrderToCancel(orderId);
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!orderToCancel) return;

    try {
      setIsLoading(true);
      const updatedOrder = await cancelOrder(orderToCancel, cancellationReason);
      console.log("Updated order:", updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderToCancel
            ? {
                ...order,
                status: updatedOrder.status,
                totalAmount: updatedOrder.totalAmount,
                updatedAt: updatedOrder.updatedAt,
              }
            : order
        )
      );
      setIsCancelModalOpen(false);
      setCancellationReason("");
      setOrderToCancel(null);
    } catch (error) {
      console.error("Failed to cancel order", error);
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

  const handleOrderUpdate = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {isOffline && (
          <Alert
            variant="default"
            className="mb-6 bg-yellow-50 border-yellow-200"
          >
            <WifiOff className="h-4 w-4" />
            <AlertTitle>You are offline</AlertTitle>
            <AlertDescription>
              You&apos;re currently viewing cached orders. Some features may be
              limited until you reconnect.
            </AlertDescription>
          </Alert>
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
          <AnimatePresence>
            {isLoading ? (
              <>
                <OrderCardSkeleton />
                <OrderCardSkeleton />
                <OrderCardSkeleton />
              </>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onCancelOrder={handleCancelClick}
                  onToggleExpansion={toggleOrderExpansion}
                  onReorder={handleReorder}
                  onOrderUpdate={handleOrderUpdate}
                  isLoading={isLoading}
                  expandedOrder={expandedOrder}
                />
              ))
            ) : (
              <EmptyOrders
                hasSearchQuery={!!searchQuery || statusFilter !== "all"}
              />
            )}
          </AnimatePresence>
        </div>

        <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Order</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Please provide a reason for cancellation..."
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setCancellationReason("");
                  setOrderToCancel(null);
                }}
              >
                Close
              </Button>
              <Button
                onClick={handleCancelConfirm}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600"
              >
                {isLoading ? "Cancelling..." : "Confirm Cancellation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
