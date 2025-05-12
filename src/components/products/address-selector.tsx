import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/lib/ui/button/button";
import { Label } from "@/components/ui/label";
import { MapPin, Plus } from "lucide-react";
import { AddressFormData } from "./address-dialog";
import { useEffect, useState } from "react";
import { AddressDialog } from "./address-dialog";

interface Address extends AddressFormData {
  id: string;
  isDefault: boolean;
  landmark?: string;
  country: string;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: string;
  onAddressChange: (addressId: string) => void;
  onAddNewAddress?: (address: AddressFormData) => Promise<void>;
}

export function AddressSelector({
  addresses = [],
  selectedAddressId,
  onAddressChange,
  onAddNewAddress,
}: Readonly<AddressSelectorProps>) {
  // Auto-select default address when addresses change
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((addr) => addr.isDefault);
      if (!selectedAddressId) {
        // If nothing is selected, select default or first
        onAddressChange(defaultAddr ? defaultAddr.id : addresses[0].id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses, selectedAddressId]);

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddNew = () => {
    setIsDialogOpen(true);
  };
  const handleSaveNewAddress = async (address: AddressFormData) => {
    if (onAddNewAddress) {
      await onAddNewAddress(address);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full lg:w-[500px]">
      <Label htmlFor="address-select" className="text-sm font-medium">
        Delivery Address
      </Label>
      <div className="flex items-center gap-2">
        <Select value={selectedAddressId} onValueChange={onAddressChange}>
          <SelectTrigger
            id="address-select"
            className="w-full h-auto py-2 px-2.5 sm:py-2.5 sm:px-3"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                <span className="font-medium text-sm sm:text-base truncate">
                  {selectedAddress?.name}
                </span>
                {selectedAddress?.isDefault && (
                  <span className="text-[9px] sm:text-[10px] bg-primary/10 text-primary px-1 sm:px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                    Default
                  </span>
                )}
              </div>
            </div>
          </SelectTrigger>
          <SelectContent
            align="end"
            className="min-w-[250px] max-w-[95vw] w-full"
          >
            {addresses.map((addr) => (
              <SelectItem
                key={String(addr.id)}
                value={addr.id}
                className="px-3 py-2"
              >
                <div className="flex items-start gap-2 w-full min-w-0">
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="font-medium text-sm sm:text-base">
                        {addr.name}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[9px] sm:text-[10px] bg-primary/10 text-primary px-1 sm:px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      <span className="line-clamp-2">
                        {addr.address}
                        {addr.landmark && `, ${addr.landmark}`}, {addr.city},{" "}
                        {addr.state} - {addr.pincode}
                      </span>
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 sm:h-10 sm:w-10 shrink-0"
          onClick={handleAddNew}
        >
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>
      <AddressDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveNewAddress}
        mode="add"
      />
    </div>
  );
}
