import { Button } from "@/lib/ui/button/button";
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
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
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
      state: "",
      pincode: "",
      country: "India", // Default country
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
      <DialogContent className="w-[95vw] sm:max-w-[425px] md:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white border-2 border-[#D84315] shadow-xl rounded-2xl z-[100]">
        <DialogHeader>
          <DialogTitle className="text-[#D84315] text-2xl font-extrabold tracking-wide">
            {mode === "add" ? "Add New Address" : "Edit Address"}
            <div className="w-16 h-1 bg-[#FFB300] rounded-full " />
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="text-[#D84315] font-semibold text-base"
            >
              Address Name
            </Label>
            <Input
              id="name"
              placeholder="Home, Office, etc."
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              className="border-2 border-orange-200 focus:border-[#D84315] focus:ring-[#D84315]/20 rounded-lg py-2 px-3 bg-white"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="address"
              className="text-[#D84315] font-semibold text-base"
            >
              Street Address
            </Label>
            <Input
              id="address"
              placeholder="Street address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              required
              className="border-2 border-orange-200 focus:border-[#D84315] focus:ring-[#D84315]/20 rounded-lg py-2 px-3 bg-white"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="landmark"
              className="text-[#D84315] font-semibold text-base"
            >
              Landmark
            </Label>
            <Input
              id="landmark"
              placeholder="Near..."
              value={formData.landmark}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, landmark: e.target.value }))
              }
              className="border-2 border-orange-200 focus:border-[#D84315] focus:ring-[#D84315]/20 rounded-lg py-2 px-3 bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="city"
                className="text-[#D84315] font-semibold text-base"
              >
                City
              </Label>
              <Input
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
                required
                className="border-2 border-orange-200 focus:border-[#D84315] focus:ring-[#D84315]/20 rounded-lg py-2 px-3 bg-white"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="state"
                className="text-[#D84315] font-semibold text-base"
              >
                State
              </Label>
              <div className="relative w-full">
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, state: e.target.value }))
                  }
                  required
                  className="w-full border-2 border-orange-200 focus:border-[#D84315] focus:ring-[#D84315]/20 rounded-lg py-2 px-3 pr-12 bg-white appearance-none"
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {INDIAN_STATES_AND_UTS.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  ▼
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="pincode"
              className="text-[#D84315] font-semibold text-base"
            >
              PIN Code
            </Label>
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
              className="border-2 border-orange-200 focus:border-[#D84315] focus:ring-[#D84315]/20 rounded-lg py-2 px-3 bg-white"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="country"
              className="text-[#D84315] font-semibold text-base"
            >
              Country
            </Label>
            <Input
              id="country"
              placeholder="Country"
              value={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, country: e.target.value }))
              }
              required
              className="border-2 border-orange-200 focus:border-[#D84315] focus:ring-[#D84315]/20 rounded-lg py-2 px-3 bg-white"
            />
          </div>
          <div className="flex items-center space-x-3 mt-2">
            <Checkbox
              id="isDefault"
              checked={formData.isDefault}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isDefault: checked as boolean,
                }))
              }
              className="border-2 border-orange-200 data-[state=checked]:bg-[#D84315] data-[state=checked]:border-[#D84315] rounded-full w-5 h-5"
            />
            <Label
              htmlFor="isDefault"
              className="text-[#D84315] font-medium text-base select-none cursor-pointer"
            >
              Set as default address
            </Label>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#D84315] hover:bg-[#D84315]/90 text-white text-lg font-bold rounded-lg py-2 mt-2 shadow-md w-full"
            >
              {mode === "add" ? "Add" : "Save"} Address
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export const INDIAN_STATES_AND_UTS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];
