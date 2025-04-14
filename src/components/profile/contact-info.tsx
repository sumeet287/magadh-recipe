import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInfoProps {
  phoneNumber: string;
  name: string;
  email: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ContactInfo({
  phoneNumber,
  name,
  email,
  onInputChange,
}: Readonly<ContactInfoProps>) {
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
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          disabled
          className="bg-gray-50 font-medium"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={onInputChange}
          placeholder="Enter your full name"
          className="focus:border-orange-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={onInputChange}
          placeholder="Enter your email"
          className="focus:border-orange-500"
        />
      </div>
    </motion.div>
  );
}
