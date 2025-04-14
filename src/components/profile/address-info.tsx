import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddressInfoProps {
  address: string;
  city: string;
  state: string;
  pincode: string;
  showSuggestions: boolean;
  suggestedAddresses: string[];
  indianStates: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStateChange: (value: string) => void;
  onAddressSelect: (address: string) => void;
  setShowSuggestions: (show: boolean) => void;
}

export function AddressInfo({
  address,
  city,
  state,
  pincode,
  showSuggestions,
  suggestedAddresses,
  indianStates,
  onInputChange,
  onStateChange,
  onAddressSelect,
  setShowSuggestions,
}: Readonly<AddressInfoProps>) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.3 },
        },
      }}
      className="space-y-6"
    >
      <div className="relative space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <Input
            id="address"
            name="address"
            value={address}
            onChange={onInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter your address"
            className="focus:border-orange-500"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg"
          >
            {suggestedAddresses.map((addr, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                onClick={() => onAddressSelect(addr)}
              >
                {addr}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={city}
            onChange={onInputChange}
            placeholder="City"
            className="focus:border-orange-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={state} onValueChange={onStateChange}>
            <SelectTrigger className="focus:border-orange-500">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">PIN Code</Label>
          <Input
            id="pincode"
            name="pincode"
            value={pincode}
            onChange={onInputChange}
            placeholder="PIN Code"
            className="focus:border-orange-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
