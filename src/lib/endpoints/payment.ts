import api from "../axios";

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}

export interface VerifyPaymentRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
}

export const paymentEndpoints = {
  createOrder: (orderId: string) =>
    api.post<CreateOrderResponse>("/payments/create-order", { orderId }),

  verifyPayment: (data: VerifyPaymentRequest) =>
    api.post<VerifyPaymentResponse>("/payments/verify", data),
};
