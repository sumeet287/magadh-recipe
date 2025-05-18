import React from "react";
import { Typography } from "@/lib/ui/typography/typography";
import { Button } from "@/lib/ui/button/button";

const CraftSupport = () => {
  return (
    <section className="py-12 bg-orange-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <Typography
          variant="h2"
          weight="bold"
          align="center"
          className="text-white drop-shadow mb-4"
        >
          Support Local Pickle Makers, Preserve Bihar&apos;s Taste
        </Typography>
        <Typography
          variant="p"
          color="white"
          align="center"
          className="text-white/80 font-medium max-w-2xl mx-auto mb-6"
        >
          Every purchase helps sustain traditional pickle making and supports the livelihood of skilled pickle makers from Bihar.
        </Typography>
        <Button
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-orange-600 transition"
        >
          Connect With Pickle Makers
        </Button>
      </div>
    </section>
  );
};

export default CraftSupport;
