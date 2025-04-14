export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface TrackingInfo {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  trackingInfo?: TrackingInfo[];
}
