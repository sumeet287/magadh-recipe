import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export interface AddressFormData {
  id?: string;
  name: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (address: AddressFormData) => void;
  initialData?: AddressFormData;
  mode: "add" | "edit";
}

export function AddressDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
  mode,
}: Readonly<AddressDialogProps>) {
  const [formData, setFormData] = useState<AddressFormData>(
    initialData || {
      name: "",
      address: "",
      landmark: "",
      city: "",
      state: "Bihar", // Default state
      pincode: "",
      isDefault: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Address" : "Edit Address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Address Name</Label>
            <Input
              id="name"
              placeholder="Home, Office, etc."
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              placeholder="Street address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="landmark">Landmark</Label>
            <Input
              id="landmark"
              placeholder="Near..."
              value={formData.landmark}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, landmark: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pincode">PIN Code</Label>
              <Input
                id="pincode"
                placeholder="PIN Code"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pincode: e.target.value }))
                }
                required
                pattern="[0-9]{6}"
                title="Please enter a valid 6-digit PIN code"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isDefault"
              checked={formData.isDefault}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isDefault: checked as boolean,
                }))
              }
            />
            <Label htmlFor="isDefault">Set as default address</Label>
          </div>
          <DialogFooter>
            <Button type="submit">
              {mode === "add" ? "Add" : "Save"} Address
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
