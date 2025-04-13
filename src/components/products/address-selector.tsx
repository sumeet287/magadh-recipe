import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, ChevronDown } from "lucide-react";
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

    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === editingAddress?.id ? { ...data, id: addr.id } : addr
      )
    );

    if (data.isDefault) {
      onAddressChange(editingAddress?.id || selectedAddressId);
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
    <div className="flex items-center gap-2">
      <Select value={selectedAddressId} onValueChange={onAddressChange}>
        <SelectTrigger className="w-[400px] h-auto py-2 px-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
            <div className="flex flex-col items-start gap-0.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{selectedAddress?.name}</span>
                {selectedAddress?.isDefault && (
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                    Default
                  </span>
                )}
              </div>
              <span className="text-sm text-muted-foreground line-clamp-1">
                {selectedAddress?.address}
                {selectedAddress?.landmark &&
                  `, ${selectedAddress.landmark}`}, {selectedAddress?.city},{" "}
                {selectedAddress?.state} - {selectedAddress?.pincode}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {addresses.map((addr) => (
            <SelectItem key={addr.id} value={addr.id}>
              <div className="flex items-start gap-2 py-1">
                <div className="flex flex-col gap-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {addr.address}
                    {addr.landmark && `, ${addr.landmark}`}, {addr.city},{" "}
                    {addr.state} - {addr.pincode}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(addr);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 shrink-0"
        onClick={handleAddNew}
      >
        <Plus className="h-4 w-4" />
      </Button>
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
