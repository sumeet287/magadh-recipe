import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artist Directory | Bihar Bazaar",
  description: "Meet the skilled artisans behind Bihar's traditional crafts",
};

export default function ArtistDirectoryPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Artist Directory</h1>
      {/* Add your artists listing content */}
    </main>
  );
}
