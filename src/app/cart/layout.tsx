import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | Bihar Bazaar",
  description: "View and manage your cart items",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
