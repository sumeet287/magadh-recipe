"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/lib/ui/button/button";
import { Card, CardContent } from "@/components/ui/card";
import DulariDevi from "@/assets/artist/Smt_Dulari_Devi.jpg";
import KalpanaDevi from "@/assets/artist/Smt_Kalpana_Devi.png";
import ManishaJha from "@/assets/artist/Smt_Manisha_Devi.png";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    image: DulariDevi.src,
    text: "The Mango Pickle from Magadh Recipe reminded me of my childhood in Bihar. The taste is so authentic and fresh! My family finished the jar in no time. Highly recommended for anyone missing homemade pickles.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai",
    image: KalpanaDevi.src,
    text: "I ordered the Lemon and Mixed Pickle varieties. Both were packed with flavors and arrived in perfect condition. It's great to see Bihar's traditional recipes being delivered across India!",
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Bangalore",
    image: ManishaJha.src,
    text: "The stuffed chilli pickle is a must-try! I love how Magadh Recipe supports local women pickle makers and brings the real taste of Bihar to our homes.",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="border-none shadow-lg">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="relative aspect-square overflow-hidden rounded-full max-w-[200px] mx-auto">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-4">
              <Quote className="h-10 w-10 text-orange-600 opacity-50" />
              <p className="text-gray-600 italic">
                {testimonials[currentIndex].text}
              </p>
              <div>
                <h4 className="font-medium">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          size="icon"
          rounded="full"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full mx-1 transition-all duration-200 focus:outline-none
              ${
                index === currentIndex
                  ? "bg-orange-600"
                  : "border-2 border-orange-600 bg-white"
              }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          rounded="full"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  );
}
