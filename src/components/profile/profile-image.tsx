import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, User } from "lucide-react";

interface ProfileImageProps {
  profileImage: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileImage({
  profileImage,
  onImageUpload,
}: Readonly<ProfileImageProps>) {
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
      className="flex flex-col items-center gap-4"
    >
      <div className="relative group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 relative border-4 border-orange-200"
        >
          {profileImage ? (
            <Image
              src={profileImage}
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
            onChange={onImageUpload}
          />
        </label>
      </div>
    </motion.div>
  );
}
