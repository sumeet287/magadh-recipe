import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, WifiOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface OrdersHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
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
}: Readonly<OrdersHeaderProps>) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Orders</h1>
        {isOffline && (
          <div className="flex items-center gap-2 text-yellow-600">
            <WifiOff className="w-5 h-5" />
            <span className="text-sm">Offline Mode</span>
          </div>
        )}
      </div>
      <div className="flex sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isOffline}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={onStatusFilterChange}
          disabled={isOffline}
        >
          <SelectTrigger className="w-[180px] rounded-l-none border-l-0 focus:ring-0 focus:ring-offset-0">
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
  );
}
