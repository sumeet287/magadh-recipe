import { useEffect, useRef, useState } from "react";
import TickerCard from "../tickercard/ticker-card";

interface Craft {
  id: number;
  title: string;
  productCount: number;
  imageUrl: string;
}

const crafts: Craft[] = [
  {
    id: 1,
    title: "Madhubani Art",
    productCount: 42,
    imageUrl: "https://picsum.photos/300?random=5&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Tikuli Art",
    productCount: 28,
    imageUrl: "https://picsum.photos/300?random=8&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Sujini Embroidery",
    productCount: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Bamboo Craft",
    productCount: 19,
    imageUrl: "https://picsum.photos/300?random=1&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Sikki Craft",
    productCount: 24,
    imageUrl: "https://picsum.photos/300?random=2&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Pottery",
    productCount: 31,
    imageUrl: "https://picsum.photos/300?random=3&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Wood Carving",
    productCount: 17,
    imageUrl: "https://picsum.photos/300?random=9&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Metal Craft",
    productCount: 22,
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
  const duplicatedCrafts = [...crafts, ...crafts];

  return (
    <div
      className="ticker-container w-full overflow-hidden relative py-10"
      ref={containerRef}
    >
      <div
        className={`flex ${isVisible ? "animate-ticker" : ""}`}
        style={{ width: `${crafts.length * 300}px` }}
      >
        {duplicatedCrafts.map((craft, index) => (
          <TickerCard
            key={`${craft.id}-${index}`}
            title={craft.title}
            productCount={craft.productCount}
            imageUrl={craft.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default TickerSlider;
