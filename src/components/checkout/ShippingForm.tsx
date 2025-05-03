import { AddressSelector } from "@/components/products/address-selector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MapPin, ChevronRight } from "lucide-react";
import {
  AddressDialog,
  AddressFormData,
} from "@/components/products/address-dialog";
import React from "react";
import type { Address } from "@/lib/endpoints/addresses";

interface ShippingFormProps {
  addresses: (Address & { id: string })[];
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string) => void;
  handleAddNewAddress: (data: AddressFormData) => Promise<void>;
  deliveryNotes: string;
  setDeliveryNotes: (notes: string) => void;
  handleNextStep: () => void;
  isAddressDialogOpen: boolean;
  setIsAddressDialogOpen: (open: boolean) => void;
}

export default function ShippingForm({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  handleAddNewAddress,
  deliveryNotes,
  setDeliveryNotes,
  handleNextStep,
  isAddressDialogOpen,
  setIsAddressDialogOpen,
}: ShippingFormProps) {
  return (
    <Card className="border-brand-border bg-white shadow-md">
      <CardHeader className="bg-brand-light rounded-t-lg border-b border-brand-border p-6">
        <CardTitle className="text-brand-accent flex items-center gap-2">
          <MapPin className="h-5 w-5 text-brand" />
          Shipping Information
        </CardTitle>
        <CardDescription>
          Choose your delivery address or add a new one
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-3 sm:px-6 pt-6">
        <AddressSelector
          addresses={addresses}
          selectedAddressId={selectedAddressId || ""}
          onAddressChange={setSelectedAddressId}
          onAddNewAddress={handleAddNewAddress}
        />
        <Separator className="my-4 bg-brand-border" />
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-brand-accent font-medium">
            Delivery Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Special instructions for delivery"
            className="h-[120px] border-brand-border focus-visible:ring-brand"
            value={deliveryNotes}
            onChange={(e) => setDeliveryNotes(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-6 bg-brand-light rounded-b-lg border-t border-brand-border">
        <Button
          onClick={handleNextStep}
          disabled={!selectedAddressId}
          className="bg-brand hover:bg-brand-dark text-white"
        >
          Continue to Payment
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
      <AddressDialog
        open={isAddressDialogOpen}
        onOpenChange={setIsAddressDialogOpen}
        onSave={handleAddNewAddress}
        mode="add"
      />
    </Card>
  );
}
