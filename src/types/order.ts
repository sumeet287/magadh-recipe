export interface PaymentDetails {
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: "online" | "cash_on_delivery";
  paymentId?: string;
  paidAt?: Date;
  amount: number;
  transactionId?: string;
}

export interface TrackingInfo {
  trackingNumber?: string;
  courierName?: string;
  estimatedDeliveryDate?: Date;
  lastUpdated?: Date;
  trackingUrl?: string;
}

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    productImage: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "ready_for_pickup"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "cancelled"
    | "returned"
    | "refunded";
  statusHistory: Array<{
    status: string;
    timestamp: Date;
    note?: string;
  }>;
  paymentDetails: PaymentDetails;
  trackingInfo?: TrackingInfo;
  shippingAddress: {
    address: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    landmark: string;
    name: string;
    pinCode: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  addressId: string;
  paymentMethod: "online" | "cash_on_delivery";
}

export interface CheckoutRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  addressId: string;
  paymentMethod: "online" | "cash_on_delivery";
  notes?: string;
}

export interface UpdateOrderStatusRequest {
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "ready_for_pickup"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "cancelled"
    | "returned"
    | "refunded";
  trackingInfo?: {
    trackingNumber?: string;
    courierName?: string;
    estimatedDeliveryDate?: Date;
    trackingUrl?: string;
  };
  note?: string;
}

export interface UpdatePaymentStatusRequest {
  paymentId: string;
  transactionId: string;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  statusStats: {
    pending: { count: number; totalAmount: number };
    confirmed: { count: number; totalAmount: number };
    processing: { count: number; totalAmount: number };
    ready_for_pickup: { count: number; totalAmount: number };
    shipped: { count: number; totalAmount: number };
    out_for_delivery: { count: number; totalAmount: number };
    delivered: { count: number; totalAmount: number };
    cancelled: { count: number; totalAmount: number };
    returned: { count: number; totalAmount: number };
    refunded: { count: number; totalAmount: number };
  };
  recentOrders: Array<{
    _id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
  }>;
  dailyStats: Array<{
    date: string;
    orders: number;
    revenue: number;
  }>;
}
