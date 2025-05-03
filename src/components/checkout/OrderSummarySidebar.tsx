import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Truck,
  PackageCheck,
  Shield,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  productImage?: string;
}

interface OrderSummarySidebarProps {
  cart: CartItem[];
  cartTotal: number;
  appliedCoupon: { code: string; discountPercent: number } | null;
  discountAmount: number;
  finalTotal: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  handleApplyCoupon: () => void;
  couponError: string;
  isApplyingCoupon: boolean;
}

export default function OrderSummarySidebar({
  cart,
  cartTotal,
  appliedCoupon,
  discountAmount,
  finalTotal,
  couponCode,
  setCouponCode,
  handleApplyCoupon,
  couponError,
  isApplyingCoupon,
}: OrderSummarySidebarProps) {
  return (
    <>
      <Card className="border-brand-border bg-white shadow-md">
        <CardHeader className="bg-brand-light rounded-t-lg border-b border-brand-border p-6">
          <CardTitle className="text-brand-accent flex items-center gap-2 ">
            <ShoppingBag className="h-5 w-5 text-brand" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center pb-4 border-b border-brand-border"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-md border bg-brand-light flex items-center justify-center shadow-sm">
                  {item.productImage ? (
                    <img
                      src={item.productImage || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <PackageCheck className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-brand-accent">{item.name}</h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    <p>Size: {item.size || "Standard"}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="font-medium text-brand">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="text-brand-accent">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>₹0</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-sm">
                <span>Discount ({appliedCoupon.code})</span>
                <span className="text-brand">-₹{discountAmount}</span>
              </div>
            )}
          </div>

          <Separator className="bg-brand-border" />

          <div className="flex justify-between font-medium text-lg">
            <span className="text-brand-accent">Total</span>
            <span className="text-brand">₹{finalTotal}</span>
          </div>

          <div className="bg-brand-light p-4 rounded-lg space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-brand-accent">Have a coupon?</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code"
                  className="border-brand-border focus-visible:ring-brand"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  onClick={handleApplyCoupon}
                  className="bg-brand hover:bg-brand-dark text-white"
                  disabled={!couponCode || isApplyingCoupon}
                >
                  Apply
                </Button>
              </div>
              {couponError && (
                <p className="text-red-500 text-xs">{couponError}</p>
              )}
              {appliedCoupon && (
                <p className="text-brand-accent text-xs">
                  Coupon applied: {appliedCoupon.discountPercent}% off
                </p>
              )}
            </div>
          </div>

          <div className="bg-brand-light p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-brand-accent" />
              <p className="text-sm">Free shipping on orders over ₹500</p>
            </div>
            <div className="flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-brand-accent" />
              <p className="text-sm">Handcrafted with care by local artisans</p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-accent" />
              <p className="text-sm">
                Secure checkout - your data is protected
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 p-4 bg-white rounded-lg border border-brand-border shadow-sm">
        <p className="text-sm font-medium text-brand-accent mb-2">
          Need help with your order?
        </p>
        <Link
          href="/contact"
          className="text-brand hover:underline text-sm flex items-center gap-1"
        >
          <MessageCircle className="h-4 w-4" />
          Contact customer support
        </Link>
      </div>
    </>
  );
}
