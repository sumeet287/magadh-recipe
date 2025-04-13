import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | Bihar Bazaar",
  description: "View and manage your wishlist items",
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
