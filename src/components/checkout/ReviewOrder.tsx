import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShoppingBag, Package } from "lucide-react";
import React from "react";
import type { Address } from "@/lib/endpoints/addresses";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productImage?: string;
}

interface ReviewOrderProps {
  cart: CartItem[];
  cartTotal: number;
  selectedAddress?: Address;
  deliveryNotes: string;
  paymentMethod: string;
  handlePlaceOrder: () => void;
  handlePreviousStep: () => void;
}

export default function ReviewOrder({
  cart,
  cartTotal,
  selectedAddress,
  deliveryNotes,
  paymentMethod,
  handlePlaceOrder,
  handlePreviousStep,
}: ReviewOrderProps) {
  return (
    <Card className="border-brand-border bg-white shadow-md">
      <CardHeader className="bg-brand-light rounded-t-lg border-b border-brand-border p-6">
        <CardTitle className="text-brand-accent flex items-center gap-2">
          <Package className="h-5 w-5 text-brand" />
          Review Your Order
        </CardTitle>
        <CardDescription>
          Please review your order details before placing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-brand-accent">
              Shipping Information
            </h3>
          </div>
          {selectedAddress && (
            <div className="bg-brand-light p-4 rounded-lg text-sm border border-brand-border">
              <p className="font-medium text-brand-accent">
                {selectedAddress.name}
              </p>
              <p>
                {selectedAddress.address}, {selectedAddress.city}
              </p>
              <p>
                {selectedAddress.state}, {selectedAddress.country}{" "}
                {selectedAddress.pincode}
              </p>
              <p>
                {selectedAddress.name ? selectedAddress.name : "9810765432"}
              </p>
              {deliveryNotes && (
                <div className="mt-2 pt-2 border-t border-brand-border">
                  <p className="font-medium text-brand-accent">
                    Delivery Notes:
                  </p>
                  <p>{deliveryNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <Separator className="bg-brand-border" />
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-brand-accent">Payment Method</h3>
          </div>
          <div className="bg-brand-light p-4 rounded-lg text-sm border border-brand-border">
            <p className="font-medium text-brand-accent">
              {paymentMethod === "online"
                ? "Online Payment (Razorpay)"
                : "Cash on Delivery"}
            </p>
          </div>
        </div>
        <Separator className="bg-brand-border" />
        <div className="space-y-4">
          <h3 className="font-medium text-brand-accent">Order Items</h3>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center bg-brand-light p-3 rounded-lg border border-brand-border"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-white flex items-center justify-center">
                  {item.productImage ? (
                    <img
                      src={item.productImage || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <Package className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-brand-accent">{item.name}</h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    <p>Size: Standard</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="font-medium text-brand">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-4 p-6 bg-brand-light rounded-b-lg border-t border-brand-border">
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-brand-accent">Free</span>
          </div>
          <Separator className="my-2 bg-brand-border" />
          <div className="flex justify-between font-medium text-lg">
            <span className="text-brand-accent">Total</span>
            <span className="text-brand">₹{cartTotal}</span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            className="border-brand text-brand hover:bg-brand/10"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Payment
          </Button>
          <Button
            onClick={handlePlaceOrder}
            size="lg"
            className="gap-2 bg-brand hover:bg-brand-dark text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            {paymentMethod === "online" ? "Proceed to Payment" : "Place Order"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
