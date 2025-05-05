import {
  Card,
  CardHeader,
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
  paymentMethod,
  handlePlaceOrder,
  handlePreviousStep,
}: ReviewOrderProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border-[#E8D0B0] bg-white shadow-xl w-full max-w-2xl mx-auto">
      <div className="absolute right-0 top-0 h-24 w-24 bg-cover opacity-10 pointer-events-none select-none"></div>
      <CardHeader className="border-b border-[#E8D0B0] bg-gradient-to-r from-[#FBF7EF] to-[#F5EBD8] p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D84315] to-[#F4511E] shadow-md">
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#5D3A1E]">
              Order Review
            </h2>
            <p className="text-xs sm:text-sm text-[#8C6239]">
              Review your order before placing it
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative p-3 sm:p-6 bg-[#FFFCF7]">
        <Separator className="bg-brand-border mb-4" />
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-[#5D3A1E] text-base sm:text-lg mb-1">
              Payment Method
            </h3>
            <div className="mt-1 rounded-lg border border-[#E8D0B0] bg-white p-2 sm:p-3 text-xs sm:text-sm text-[#8C6239] font-medium">
              {paymentMethod === "online"
                ? "Online Payment (Razorpay)"
                : "Cash on Delivery"}
            </div>
          </div>
          <Separator className="bg-brand-border" />
          <div>
            <h3 className="font-semibold text-brand-accent text-base sm:text-lg mb-2">
              Order Items
            </h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center bg-white p-2 sm:p-3 rounded-lg border border-brand-border shadow-sm transition-all"
                >
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-md border bg-brand-light flex items-center justify-center">
                    {item.productImage ? (
                      <img
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <Package className="h-7 w-7 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="font-medium text-brand-accent text-sm sm:text-base mb-1">
                      {item.name}
                    </h4>
                    <div className="text-xs sm:text-sm text-muted-foreground flex flex-wrap gap-2">
                      <span>Size: Standard</span>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="font-semibold text-brand text-sm sm:text-base min-w-max">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 p-3 sm:p-6 bg-[#FBF7EF] rounded-b-2xl border-t border-brand-border">
        <div className="w-full space-y-2 p-0 sm:p-2">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-[#8C6239]">Subtotal</span>
            <span className="font-medium text-[#5D3A1E]">₹{cartTotal}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-[#8C6239]">Shipping</span>
            <span className="text-brand-accent font-medium">Free</span>
          </div>
          <Separator className="my-2 bg-brand-border" />
          <div className="flex justify-between font-bold text-base sm:text-lg">
            <span className="text-brand-accent">Total</span>
            <span className="text-brand">₹{cartTotal}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            className="rounded-lg border-[#E8D0B0] text-[#5D3A1E] hover:bg-[#FBF7EF] hover:text-[#D84315] cursor-pointer w-full sm:w-auto transition-all"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Payment
          </Button>
          <Button
            onClick={handlePlaceOrder}
            size="lg"
            className="rounded-lg bg-gradient-to-r from-[#D84315] to-[#F4511E] shadow-md transition-all hover:from-[#C33000] hover:to-[#E64A19] hover:shadow-lg cursor-pointer w-full sm:w-auto"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {paymentMethod === "online" ? "Proceed to Payment" : "Place Order"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
