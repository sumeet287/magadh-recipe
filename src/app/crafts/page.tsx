import CraftHero from "@/components/craft/craft-hero";
import { Metadata } from "next";
import Crafts from "@/components/craft/craft-explore";
import CraftCategories from "@/components/craft/craft-featured";
import CraftTestimonials from "@/components/craft/craft-testimonials";
import CraftSupport from "@/components/craft/craft-support";
export const metadata: Metadata = {
  title: "Crafts of Bihar | Bihar Bazaar",
  description:
    "Explore the rich handicrafts of Bihar - Madhubani, Tikuli, Wood Craft and more",
};

export default function CraftsPage() {
  return (
    <div>
      <CraftHero />
      <Crafts />
      <CraftCategories />
      <CraftTestimonials />
      <CraftSupport />
    </div>
  );
}
