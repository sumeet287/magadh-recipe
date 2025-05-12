import { Button } from "@/lib/ui/button/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { Address } from "@/types/address";

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddress: string | null;
  onSelectAddress: (addressId: string) => void;
  onAddNewAddress: () => void;
}

export function AddressSelector({
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddNewAddress,
}: AddressSelectorProps) {
  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedAddress || ""}
        onValueChange={onSelectAddress}
        className="space-y-4"
      >
        {addresses.map((address) => (
          <div key={address.id} className="flex items-center space-x-2">
            <RadioGroupItem value={address.id} id={address.id} />
            <Label htmlFor={address.id} className="cursor-pointer">
              {address.street}, {address.city}, {address.state} -{" "}
              {address.postalCode}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Button variant="outline" onClick={onAddNewAddress} className="w-full">
        Add New Address
      </Button>
    </div>
  );
}
