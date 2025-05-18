import { useEffect, useRef, useState } from "react";
import TickerCard from "../tickercard/ticker-card";

interface Pickle {
  id: number;
  title: string;
  productCount: number;
  imageUrl: string;
}

const pickles: Pickle[] = [
  {
    id: 1,
    title: "Aam ka Achar (Mango Pickle)",
    productCount: 12,
    imageUrl: "https://picsum.photos/300?random=5&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Nimbu ka Achar (Lemon Pickle)",
    productCount: 8,
    imageUrl: "https://picsum.photos/300?random=8&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Mirch ka Bharwa Achar (Stuffed Chilli Pickle)",
    productCount: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Mix Achar (Mixed Pickle)",
    productCount: 15,
    imageUrl: "https://picsum.photos/300?random=1&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Kathal ka Achar (Jackfruit Pickle)",
    productCount: 7,
    imageUrl: "https://picsum.photos/300?random=2&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Adrak ka Achar (Ginger Pickle)",
    productCount: 6,
    imageUrl: "https://picsum.photos/300?random=3&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Lal Mirch ka Achar (Red Chilli Pickle)",
    productCount: 9,
    imageUrl: "https://picsum.photos/300?random=9&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Gajar ka Achar (Carrot Pickle)",
    productCount: 5,
    imageUrl: "https://picsum.photos/300?random=10&auto=format&fit=crop",
  },
];

const TickerSlider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Duplicate items to create a seamless scroll effect
  const duplicatedPickles = [...pickles, ...pickles];

  return (
    <div
      className="ticker-container w-full overflow-hidden relative py-10"
      ref={containerRef}
    >
      <div
        className={`flex ${isVisible ? "animate-ticker" : ""}`}
        style={{ width: `${pickles.length * 300}px` }}
      >
        {duplicatedPickles.map((pickle, index) => (
          <TickerCard
            key={`${pickle.id}-${index}`}
            title={pickle.title}
            productCount={pickle.productCount}
            imageUrl={pickle.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default TickerSlider;
