import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Mail } from "lucide-react";

const Subscribe = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-400 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md p-6 sm:p-12 border border-white/20">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg text-amber-50">
            Stay Connected
            <span className="block mx-auto mt-3 h-1 w-20 rounded bg-white/70"></span>
          </h2>
          <p className="text-orange-50 text-lg sm:text-xl font-medium drop-shadow">
            Subscribe to our newsletter to receive updates on new arrivals,
            special offers, and stories of our artisans.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl px-5 py-3 bg-white/80 text-orange-700 placeholder:text-orange-400 border border-white/40 shadow focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
              required
            />
            <Button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl px-7 py-3 font-bold bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/70 cursor-pointer"
            >
              <Mail className="h-5 w-5" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
