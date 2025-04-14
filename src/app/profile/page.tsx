"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Loader2, User, MapPin } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserProfile {
  phoneNumber: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profileImage: string;
}

const indianStates = [
  "Bihar",
  "Delhi",
  "Uttar Pradesh",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "West Bengal",
  "Rajasthan",
  "Other",
];

const suggestedAddresses = [
  "Madhubani, Bihar",
  "Darbhanga, Bihar",
  "Patna, Bihar",
  "Muzaffarpur, Bihar",
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    phoneNumber: "",
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    profileImage: "",
  });

  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userPhone = localStorage.getItem("userPhone");

    if (!isAuthenticated || !userPhone) {
      router.push("/");
      return;
    }

    // Load profile data from localStorage or API
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile({ ...JSON.parse(savedProfile), phoneNumber: userPhone });
    } else {
      setProfile((prev) => ({ ...prev, phoneNumber: userPhone }));
    }
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (value: string) => {
    setProfile((prev) => ({ ...prev, state: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically upload to a storage service
    // For now, we'll use a local URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        profileImage: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSuggestedAddress = (address: string) => {
    const [city, state] = address.split(", ");
    setProfile((prev) => ({
      ...prev,
      city,
      state,
      address: address,
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically save to an API
      localStorage.setItem("userProfile", JSON.stringify(profile));
      toast.success("Profile updated successfully! 🎉");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto py-8 px-4"
    >
      <Card className="max-w-2xl mx-auto backdrop-blur-sm bg-white/90">
        <CardHeader>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-2xl font-bold text-center text-orange-600">
              My Profile
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 relative border-4 border-orange-200"
                >
                  {profile.profileImage ? (
                    <Image
                      src={profile.profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-14 h-14 text-gray-400" />
                    </div>
                  )}
                </motion.div>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 p-2 bg-orange-500 rounded-full cursor-pointer hover:bg-orange-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Camera className="h-5 w-5 text-white" />
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  disabled
                  className="bg-gray-50 font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
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
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="focus:border-orange-500"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <Input
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
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
                        onClick={() => handleSuggestedAddress(addr)}
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
                    value={profile.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="focus:border-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={profile.state}
                    onValueChange={handleStateChange}
                  >
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
                <div>
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={profile.pincode}
                    onChange={handleInputChange}
                    placeholder="PIN Code"
                    className="focus:border-orange-500"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-4"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-medium rounded-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
