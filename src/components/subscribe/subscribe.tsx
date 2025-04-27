import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Subscribe = () => {
  return (
    <section className="py-16 bg-orange-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Stay Connected</h2>
          <p className="text-orange-100">
            Subscribe to our newsletter to receive updates on new arrivals,
            special offers, and stories of our artisans
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-orange-100"
            />
            <Button className="bg-white text-orange-600 hover:bg-orange-100">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
