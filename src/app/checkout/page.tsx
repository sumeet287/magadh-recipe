"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { useOrder } from "@/hooks/useOrder";
import { useAddresses } from "@/hooks/useAddresses";
import { AddressSelector } from "@/components/products/address-selector";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AddressDialog,
  AddressFormData,
} from "@/components/products/address-dialog";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { addresses, isLoading, createAddress } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && addresses.length === 0) {
      setIsAddressDialogOpen(true);
    }
  }, [isLoading, addresses]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const selectedAddress = addresses.find(
        (addr) => addr._id === selectedAddressId
      );
      if (!selectedAddress) {
        toast.error("Selected address not found");
        return;
      }

      await createOrder({
        items: orderItems,
        addressId: selectedAddressId,
        paymentMethod: "cash_on_delivery",
      });

      clearCart();
      toast.success("Order placed successfully! Redirecting to your orders...");
      setTimeout(() => {
        router.push("/orders");
      }, 2000);
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order");
    }
  };

  const handleAddNewAddress = async (addressData: AddressFormData) => {
    try {
      const newAddress = await createAddress(addressData);
      setSelectedAddressId(newAddress._id);
      setIsAddressDialogOpen(false);
    } catch (error) {
      console.error("Failed to add new address:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Address Selection */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Shipping Address</h2>

          <AddressSelector
            addresses={addresses.map((addr) => ({
              ...addr,
              id: addr._id,
              country: addr.country,
            }))}
            selectedAddressId={selectedAddressId || ""}
            onAddressChange={setSelectedAddressId}
            onAddNewAddress={handleAddNewAddress}
          />
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="bg-gray-50 p-4 rounded-lg">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  ₹
                  {cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handlePlaceOrder}
            disabled={addresses.length === 0 || !selectedAddressId}
            className="w-full"
          >
            Place Order
          </Button>
        </div>
      </div>

      <AddressDialog
        open={isAddressDialogOpen}
        onOpenChange={setIsAddressDialogOpen}
        onSave={handleAddNewAddress}
        mode="add"
      />
    </div>
  );
}
