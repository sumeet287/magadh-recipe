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

export interface PaymentDetails {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface VerifyPaymentResponse {
  status: string;
  message: string;
  payment: PaymentDetails;
}

export const paymentEndpoints = {
  createOnlineOrder: "/payments/create",
  verifyPayment: "/payments/verify",
  createCodOrder: "/payments/pay-now",
};

export const paymentApi = {
  createOnlineOrder: (orderId: string) =>
    api.post<CreateOrderResponse>(paymentEndpoints.createOnlineOrder, {
      orderId,
    }),
  createCodOrder: (orderId: string) =>
    api.post<CreateOrderResponse>(paymentEndpoints.createCodOrder, {
      orderId,
    }),
  verifyPayment: (data: VerifyPaymentRequest) =>
    api.post<VerifyPaymentResponse>(paymentEndpoints.verifyPayment, data),
};
