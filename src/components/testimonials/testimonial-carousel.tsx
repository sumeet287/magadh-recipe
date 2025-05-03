"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    text: "The Madhubani painting I purchased is absolutely stunning. The attention to detail and vibrant colors bring so much life to my living room. I'm proud to display such authentic Bihar art in my home.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai",
    image: KalpanaDevi.src,
    text: "I bought several pieces of Tikuli art as gifts for my family, and they were all amazed by the craftsmanship. The packaging was excellent, and the items arrived in perfect condition. Will definitely shop again!",
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Bangalore",
    image: ManishaJha.src,
    text: "The Sujini embroidered bedcover I purchased is not just beautiful but also tells a story. I appreciate how Bihar Bazaar connects us directly with the artisans and helps preserve these traditional art forms.",
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
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
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
      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant={index === currentIndex ? "default" : "outline"}
            size="icon"
            className={`h-3 w-3 rounded-full p-0 ${
              index === currentIndex ? "bg-orange-600" : "border-orange-600"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to testimonial {index + 1}</span>
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  );
}
