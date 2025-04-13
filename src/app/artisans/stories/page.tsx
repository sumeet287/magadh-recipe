import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artist Stories | Bihar Bazaar",
  description:
    "Stories of master craftspeople preserving Bihar's artistic heritage",
};

export default function ArtistStoriesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Artist Stories</h1>
      {/* Add your stories content */}
    </main>
  );
}
