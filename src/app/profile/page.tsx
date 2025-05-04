"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ProfileImage } from "@/components/profile/profile-image";
import { ContactInfo } from "@/components/profile/contact-info";
import { AddressInfo } from "@/components/profile/address-info";

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
    const userPhone = localStorage.getItem("userPhone");

    if (!userPhone) {
      router.push("/");
      return;
    }

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
            <ProfileImage
              profileImage={profile.profileImage}
              onImageUpload={handleImageUpload}
            />

            <ContactInfo
              phoneNumber={profile.phoneNumber}
              name={profile.name}
              email={profile.email}
              onInputChange={handleInputChange}
            />

            <AddressInfo
              address={profile.address}
              city={profile.city}
              state={profile.state}
              pincode={profile.pincode}
              showSuggestions={showSuggestions}
              suggestedAddresses={suggestedAddresses}
              indianStates={indianStates}
              onInputChange={handleInputChange}
              onStateChange={handleStateChange}
              onAddressSelect={handleSuggestedAddress}
              setShowSuggestions={setShowSuggestions}
            />

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3 },
                },
              }}
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
