import { AddressSelector } from "@/components/products/address-selector";
import { Button } from "@/lib/ui/button/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
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
    <Card className="overflow-hidden rounded-2xl border-[#E8D0B0] bg-white shadow-xl w-full max-w-2xl mx-auto">
      <div className="absolute right-0 top-0 h-24 w-24 bg-[url('/corner-decoration.png')] bg-cover opacity-10 pointer-events-none select-none"></div>
      <CardHeader className="border-b border-[#E8D0B0] bg-gradient-to-r from-[#FBF7EF] to-[#F5EBD8] p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D84315] to-[#F4511E] shadow-md">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#5D3A1E]">
              Shipping Information
            </h2>
            <p className="text-xs sm:text-sm text-[#8C6239]">
              Choose your delivery address or add a new one
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-3 sm:px-6 pt-4 sm:pt-6 bg-[#FFFCF7]">
        {!selectedAddressId && (
          <div className="text-sm text-[#D84315] font-medium mb-2">
            Please select or add a delivery address to continue.
          </div>
        )}
        <AddressSelector
          addresses={addresses}
          selectedAddressId={selectedAddressId || ""}
          onAddressChange={setSelectedAddressId}
          onAddNewAddress={handleAddNewAddress}
        />
        <Separator className="my-4 bg-brand-border" />
        <div className="space-y-2">
          <Label
            htmlFor="notes"
            className="text-brand-accent font-semibold text-sm sm:text-base"
          >
            Delivery Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Special instructions for delivery"
            className="h-[100px] sm:h-[120px] border-brand-border focus-visible:ring-brand text-sm sm:text-base bg-white rounded-lg shadow-sm transition-all"
            value={deliveryNotes}
            onChange={(e) => setDeliveryNotes(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 p-3 sm:p-6 bg-[#FBF7EF] rounded-b-2xl border-t border-brand-border">
        <Button
          onClick={handleNextStep}
          disabled={!selectedAddressId}
          className="rounded-lg bg-gradient-to-r from-[#D84315] to-[#F4511E] shadow-md transition-all hover:from-[#C33000] hover:to-[#E64A19] hover:shadow-lg cursor-pointer w-full sm:w-auto"
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
