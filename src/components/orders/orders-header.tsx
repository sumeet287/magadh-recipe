"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

interface OrdersHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  isLoading: boolean;
  isOffline: boolean;
}

export function OrdersHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  isLoading,
  isOffline,
}: OrdersHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-amber-900">My Orders</h1>
        <div className="hidden md:block">
          <Select
            value={statusFilter}
            onValueChange={onStatusFilterChange}
            disabled={isLoading || isOffline}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search orders by product name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
            disabled={isLoading || isOffline}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => onSearchChange("")}
              disabled={isLoading || isOffline}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <Select
            value={statusFilter}
            onValueChange={onStatusFilterChange}
            disabled={isLoading || isOffline}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(searchQuery || statusFilter !== "all") && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center gap-1">
                <span>Search: {searchQuery}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onSearchChange("")}
                  disabled={isLoading || isOffline}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Clear search filter</span>
                </Button>
              </div>
            )}
            {statusFilter !== "all" && (
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center gap-1">
                <span>Status: {statusFilter}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onStatusFilterChange("all")}
                  disabled={isLoading || isOffline}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Clear status filter</span>
                </Button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 ml-auto"
            onClick={() => {
              onSearchChange("");
              onStatusFilterChange("all");
            }}
            disabled={isLoading || isOffline}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </motion.div>
  );
}
