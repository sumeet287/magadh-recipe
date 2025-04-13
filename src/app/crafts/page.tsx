import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crafts of Bihar | Bihar Bazaar",
  description:
    "Explore the rich handicrafts of Bihar - Madhubani, Tikuli, Wood Craft and more",
};

export default function CraftsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Crafts of Bihar</h1>
      {/* Add your crafts listing content */}
    </main>
  );
}
