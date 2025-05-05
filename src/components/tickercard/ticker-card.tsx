import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface CraftCardProps {
  title: string;
  productCount: number;
  imageUrl: string;
  className?: string;
}

const TickerCard = ({
  title,
  productCount,
  imageUrl,
  className,
}: CraftCardProps) => {
  return (
    <Card
      className={cn(
        "w-[280px] overflow-hidden relative group transition-all duration-300 hover:shadow-lg flex-shrink-0 mx-2",
        className
      )}
    >
      <div className="h-[250px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
        <h3 className="text-xl font-semibold mb-1 text-white">{title}</h3>
        <p className="text-sm opacity-90 text-white">{productCount} products</p>
      </div>
    </Card>
  );
};

export default TickerCard;
