import Link from "next/link";

export interface CraftCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
  price: string;
  category: string;
}

const CraftCard = ({
  id,
  title,
  image,
  description,
  price,
  category,
}: CraftCardProps) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover-scale">
      <div className="relative overflow-hidden h-60">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-bihar-turquoise px-2 py-1 rounded-full text-white text-xs font-medium">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-playfair font-semibold line-clamp-1">
          {title}
        </h3>
        <p className="text-stone-600 text-sm line-clamp-2 h-10">
          {description}
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="text-bihar-red font-semibold">{price}</span>
          <Link
            href={`/crafts/${id}`}
            className="bg-bihar-mustard text-stone-800 hover:bg-bihar-gold transition-colors px-3 py-1.5 rounded-md text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CraftCard;
