import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artist Stories | Bihar Bazaar",
  description:
    "Stories of master craftspeople preserving Bihar's artistic heritage",
};

export default function StoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
