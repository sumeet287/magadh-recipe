import React from "react";
import { Button } from "../ui/button";

const CraftSupport = () => {
  return (
    <section className="py-12 bg-orange-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-4">
          Support Local Artisans, Preserve Bihar&apos;s Heritage
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-6">
          Every purchase helps sustain traditional craftsmanship and supports
          the livelihood of skilled artisans.
        </p>
        <Button
          size="lg"
          className="bg-white text-orange-600 hover:bg-white/90"
        >
          Connect With Artisans
        </Button>
      </div>
    </section>
  );
};

export default CraftSupport;
