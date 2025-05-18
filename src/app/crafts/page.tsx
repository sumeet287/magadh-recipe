import CraftHero from "@/components/craft/craft-hero";
import { Metadata } from "next";
import Crafts from "@/components/craft/craft-explore";
import CraftCategories from "@/components/craft/craft-featured";
import CraftTestimonials from "@/components/craft/craft-testimonials";
import CraftSupport from "@/components/craft/craft-support";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";
export const metadata: Metadata = {
  title: "Pickles of Bihar | Magadh Recipe",
  description:
    "Explore the finest handmade pickles from Bihar - pure, traditional, and full of authentic flavors.",
};

export default function CraftsPage() {
  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      {/* Hero, Crafts, Categories, Testimonials, Support - update their content to reflect pickles */}
      <CraftHero />
      <Crafts />
      <CraftCategories />
      <CraftTestimonials />
      <CraftSupport />
    </div>
  );
}
