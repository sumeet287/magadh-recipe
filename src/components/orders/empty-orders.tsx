import { motion } from "framer-motion";
import { Package2 } from "lucide-react";

interface EmptyOrdersProps {
  hasSearchQuery: boolean;
}

export function EmptyOrders({ hasSearchQuery }: EmptyOrdersProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <Package2 className="w-12 h-12 mx-auto text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
      <p className="text-gray-500 mt-1">
        {hasSearchQuery
          ? "No orders match your search criteria"
          : "You haven't placed any orders yet."}
      </p>
    </motion.div>
  );
}
