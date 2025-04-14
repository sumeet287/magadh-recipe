import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/sections/stats";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { FeaturedArtists } from "@/components/sections/featured-artists";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedCategories />
      <FeaturedArtists />
    </div>
  );
}
