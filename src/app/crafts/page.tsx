import CraftHero from "@/components/craft/craft-hero";
import { Metadata } from "next";
import Crafts from "@/components/craft/craft-explore";
import CraftCategories from "@/components/craft/craft-featured";
import CraftTestimonials from "@/components/craft/craft-testimonials";
import CraftSupport from "@/components/craft/craft-support";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";
export const metadata: Metadata = {
  title: "Crafts of Bihar | Bihar Bazaar",
  description:
    "Explore the rich handicrafts of Bihar - Madhubani, Tikuli, Wood Craft and more",
};

export default function CraftsPage() {
  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <CraftHero />
      <Crafts />
      <CraftCategories />
      <CraftTestimonials />
      <CraftSupport />
    </div>
  );
}
