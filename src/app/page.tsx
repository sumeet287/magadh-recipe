import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/sections/stats";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { FeaturedArtists } from "@/components/sections/featured-artists";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedCategories />
      <FeaturedArtists />
      <Footer />
    </div>
  );
}
