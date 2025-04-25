import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { AddressDialog, AddressFormData } from "./address-dialog";

interface Address extends AddressFormData {
  id: string;
}

const sampleAddresses: Address[] = [
  {
    id: "1",
    name: "Home",
    address: "123, Gandhi Maidan",
    landmark: "Near Golghar",
    city: "Patna",
    state: "Bihar",
    pincode: "800001",
    isDefault: true,
  },
  {
    id: "2",
    name: "Office",
    address: "45, Frazer Road",
    landmark: "Near Museum",
    city: "Patna",
    state: "Bihar",
    pincode: "800004",
    isDefault: false,
  },
];

interface AddressSelectorProps {
  selectedAddressId: string;
  onAddressChange: (addressId: string) => void;
}

export function AddressSelector({
  selectedAddressId,
  onAddressChange,
}: Readonly<AddressSelectorProps>) {
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  const handleAddAddress = (data: AddressFormData) => {
    const newAddress: Address = {
      ...data,
      id: Date.now().toString(),
    };

    if (data.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    setAddresses((prev) => [...prev, newAddress]);
    if (data.isDefault) {
      onAddressChange(newAddress.id);
    }
  };

  const handleEditAddress = (data: AddressFormData) => {
    if (data.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    const updatedAddressId = editingAddress?.id;
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === updatedAddressId ? { ...data, id: addr.id } : addr
      )
    );

    if (data.isDefault && updatedAddressId) {
      onAddressChange(updatedAddressId);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingAddress(undefined);
    setDialogOpen(true);
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
              <SelectItem key={addr.id} value={addr.id} className="px-3 py-2">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 -mr-1"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(addr);
                    }}
                  >
                    <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
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
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={editingAddress ? handleEditAddress : handleAddAddress}
        initialData={editingAddress}
        mode={editingAddress ? "edit" : "add"}
      />
    </div>
  );
}
