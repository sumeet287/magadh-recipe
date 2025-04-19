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
import SitaDevi from "@/assets/artist/Smt_Sita_Devi.png";
import DulariDevi from "@/assets/artist/Smt_Dulari_Devi.jpg";
import KalpanaDevi from "@/assets/artist/Smt_Kalpana_Devi.png";
import ManishaJha from "@/assets/artist/Smt_Manisha_Devi.png";
// Demo data
const demoOrders: Order[] = [
  {
    id: "ORD001",
    date: "2025-03-15",
    status: "delivered",
    items: [
      {
        id: "1",
        name: "Madhubani Painting - Krishna Theme",
        price: 2999,
        quantity: 1,
        image: SitaDevi.src,
      },
      {
        id: "2",
        name: "Tikuli Art - Peacock Design",
        price: 1499,
        quantity: 2,
        image: DulariDevi.src,
      },
    ],
    total: 5997,
    shippingAddress: "123, Gandhi Maidan, Patna, Bihar - 800001",
    trackingInfo: [
      {
        status: "Order Placed",
        location: "Patna, Bihar",
        timestamp: "2025-03-15T10:00:00",
        description: "Your order has been placed successfully",
      },
      {
        status: "Processing",
        location: "Patna, Bihar",
        timestamp: "2025-03-15T12:30:00",
        description: "Your order is being processed",
      },
      {
        status: "Shipped",
        location: "Patna, Bihar",
        timestamp: "2025-03-16T09:15:00",
        description: "Your order has been shipped",
      },
      {
        status: "Delivered",
        location: "Patna, Bihar",
        timestamp: "2025-03-18T14:20:00",
        description: "Your order has been delivered",
      },
    ],
  },
  {
    id: "ORD002",
    date: "2025-03-10",
    status: "shipped",
    items: [
      {
        id: "3",
        name: "Wooden Handicraft - Wall Decor",
        price: 1999,
        quantity: 1,
        image: KalpanaDevi.src,
      },
    ],
    total: 1999,
    shippingAddress: "45, MG Road, Muzaffarpur, Bihar - 842001",
    trackingInfo: [
      {
        status: "Order Placed",
        location: "Muzaffarpur, Bihar",
        timestamp: "2025-03-10T11:00:00",
        description: "Your order has been placed successfully",
      },
      {
        status: "Processing",
        location: "Muzaffarpur, Bihar",
        timestamp: "2025-03-10T14:30:00",
        description: "Your order is being processed",
      },
      {
        status: "Shipped",
        location: "Muzaffarpur, Bihar",
        timestamp: "2025-03-11T10:15:00",
        description: "Your order has been shipped",
      },
    ],
  },
  {
    id: "ORD003",
    date: "2025-03-05",
    status: "pending",
    items: [
      {
        id: "4",
        name: "Wooden Handicraft - Wall Decor",
        price: 1999,
        quantity: 1,
        image: ManishaJha.src,
      },
    ],
    total: 1999,
    shippingAddress: "78, MG Road, Muzaffarpur, Bihar - 842001",
    trackingInfo: [
      {
        status: "Order Placed",
        location: "Muzaffarpur, Bihar",
        timestamp: "2025-03-05T12:00:00",
        description: "Your order has been placed successfully",
      },
      {
        status: "Processing",
        location: "Muzaffarpur, Bihar",
        timestamp: "2025-03-05T14:30:00",
        description: "Your order is being processed",
      },
    ],
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check if user is authenticated in localStorage
    const isUserAuthenticated =
      localStorage.getItem("isAuthenticated") === "true";
    const userPhone = localStorage.getItem("userPhone");

    if (!isUserAuthenticated || !userPhone) {
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

    // Simulate API call
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Try to get cached orders first
        const cachedOrders = localStorage.getItem("cachedOrders");
        if (cachedOrders && isOffline) {
          setOrders(JSON.parse(cachedOrders));
          return;
        }

        // If online, fetch new orders
        if (!isOffline) {
          setOrders(demoOrders);
          // Cache the orders
          localStorage.setItem("cachedOrders", JSON.stringify(demoOrders));
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
  }, [router, isOffline]);

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
          order.id === orderId ? { ...order, status: "cancelled" } : order
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
                  key={order.id}
                  order={order}
                  expandedOrder={expandedOrder}
                  onToggleExpansion={toggleOrderExpansion}
                  onCancelOrder={handleCancelOrder}
                  onReorder={handleReorder}
                  isLoading={isLoading}
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
