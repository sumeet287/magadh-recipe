import api from "../axios";

export interface CreateOrderResponse {
  paymentId: string;
  orderId?: string; // Optional because cash_on_delivery won't have it
  amount: number;
  currency: string;
  status: string;
  paymentMethod: "online" | "cash_on_delivery";
}

export interface VerifyPaymentRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
  orderId?: string;
  paymentId?: string;
}

export const paymentEndpoints = {
  createOrder: "/payments/create-order",
  verifyPayment: "/payments/verify",
};

export const paymentApi = {
  createOrder: (orderId: string) =>
    api.post<CreateOrderResponse>(paymentEndpoints.createOrder, { orderId }),

  verifyPayment: (data: VerifyPaymentRequest) =>
    api.post<VerifyPaymentResponse>(paymentEndpoints.verifyPayment, data),
};
