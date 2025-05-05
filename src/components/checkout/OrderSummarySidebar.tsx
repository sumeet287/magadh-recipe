import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Truck, PackageCheck, Package, ShieldCheck } from "lucide-react";
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
      <Card className="overflow-hidden rounded-xl border-[#E8D0B0] bg-white shadow-lg">
        <div className="absolute right-0 top-0 h-24 w-24 opacity-15"></div>
        <CardHeader className="border-b border-[#E8D0B0] bg-gradient-to-r from-[#FBF7EF] to-[#F5EBD8] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D84315] to-[#F4511E] shadow-md">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#5D3A1E]">
                Order Summary
              </h2>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative p-6">
          <div className="absolute right-0 top-1/2 h-40 w-40 -translate-y-1/2  bg-contain bg-no-repeat opacity-5"></div>
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
                  <h4 className="font-medium text-[#5D3A1E] group-hover:text-[#D84315]">
                    {item.name}
                  </h4>
                  <div className="text-xs text-[#8C6239]">
                    <p>Size: {item.size || "Standard"}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right font-medium text-[#D84315]">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#8C6239]">Subtotal</span>
              <span className="font-medium text-[#5D3A1E]">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C6239]">Shipping</span>
              <span className="text-[#D84315]">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C6239]">Tax</span>
              <span className="font-medium text-[#5D3A1E]">₹0</span>
            </div>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between text-sm">
              <span>Discount ({appliedCoupon.code})</span>
              <span className="text-brand">-₹{discountAmount}</span>
            </div>
          )}

          <Separator className="bg-[#E8D0B0]" />

          <div className="flex justify-between font-medium text-lg space-y-4">
            <span className="text-brand-accent">Total</span>
            <span className="text-brand">₹{finalTotal}</span>
          </div>

          <div className=" flex flex-col gap-4">
            <div className="rounded-lg border border-[#E8D0B0] bg-[#FFFCF7] p-4 shadow-sm space-y-4">
              <p className="font-medium text-[#5D3A1E]">Have a coupon?</p>
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="Enter code"
                  className="rounded-lg border-[#E8D0B0] bg-white focus-visible:ring-[#D84315]"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  className="rounded-lg bg-gradient-to-r from-[#D84315] to-[#F4511E] shadow-sm transition-all hover:from-[#C33000] hover:to-[#E64A19]"
                  disabled={!couponCode || isApplyingCoupon}
                  onClick={handleApplyCoupon}
                >
                  Apply
                </Button>
              </div>
              {isApplyingCoupon && (
                <p className="text-brand-accent text-xs">Applying coupon...</p>
              )}
              {couponError && (
                <p className="text-red-500 text-xs">{couponError}</p>
              )}

              {appliedCoupon && (
                <p className="text-brand-accent text-xs">
                  Coupon applied: {appliedCoupon.discountPercent}% off
                </p>
              )}
            </div>

            <div className="space-y-3 rounded-lg border border-[#E8D0B0] bg-[#FFFCF7] p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm">
                <div className="rounded-full bg-[#FBE3CD] p-1.5">
                  <Truck className="h-3.5 w-3.5 text-[#D84315]" />
                </div>
                <span className="text-[#8C6239]">
                  Free shipping on orders over ₹500
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="rounded-full bg-[#FBE3CD] p-1.5">
                  <Package className="h-3.5 w-3.5 text-[#D84315]" />
                </div>
                <span className="text-[#8C6239]">
                  Handcrafted with care by local artisans
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="rounded-full bg-[#FBE3CD] p-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#D84315]" />
                </div>
                <span className="text-[#8C6239]">
                  Secure checkout - your data is protected
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 rounded-xl border border-[#E8D0B0] bg-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBE3CD]">
            <ShieldCheck className="h-4 w-4 text-[#D84315]" />
          </div>
          <div>
            <p className="font-medium text-[#5D3A1E]">
              Need help with your order?
            </p>
            <Button
              variant="link"
              className="mt-0.5 h-auto p-0 text-[#D84315] hover:text-[#F4511E] cursor-pointer"
            >
              Contact customer support
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
