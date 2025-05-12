import Link from "next/link";
import { Typography } from "@/lib/ui/typography/typography";

interface CraftCategoryProps {
  title: string;
  image: string;
  description: string;
  link: string;
}

const categories: CraftCategoryProps[] = [
  {
    title: "Madhubani Art",
    image:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Vibrant traditional paintings depicting daily life, mythology and nature with intricate patterns.",
    link: "/crafts/madhubani",
  },
  {
    title: "Tikuli Art",
    image:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Ancient ornament-making craftsmanship transformed into beautiful paintings and decorative items.",
    link: "/crafts/tikuli",
  },
  {
    title: "Glass Art",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Delicate and colorful glasswork reflecting Bihar's rich artistic tradition and innovation.",
    link: "/crafts/glass",
  },
  {
    title: "Bamboo Craft",
    image:
      "https://images.unsplash.com/photo-1596395463910-4a5372e61f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Sustainable and eco-friendly products showcasing the versatility of bamboo and skilled craftsmanship.",
    link: "/crafts/bamboo",
  },
];

const CraftCategories = () => {
  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Typography
            variant="h2"
            weight="bold"
            align="center"
            className="text-bihar-red mb-4"
          >
            Explore <span className="text-bihar-turquoise">Craft</span>{" "}
            Categories
          </Typography>
          <Typography
            variant="p"
            color="secondary"
            align="center"
            className="max-w-2xl mx-auto"
          >
            Dive into Bihar&apos;s diverse craft traditions, each with its
            unique history, techniques, and cultural significance.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link
              href={category.link}
              key={index}
              className="group flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <Typography
                  variant="h3"
                  weight="semibold"
                  className="text-xl font-playfair text-stone-800 mb-2 group-hover:text-bihar-red transition-colors"
                >
                  {category.title}
                </Typography>
                <Typography variant="p" color="secondary" className="mb-4">
                  {category.description}
                </Typography>
                <Typography
                  variant="p"
                  as="span"
                  color="primary"
                  weight={"semibold"}
                  className="text-bihar-red inline-flex items-center   group-hover:translate-x-1 transition-transform duration-300"
                >
                  Explore {category.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftCategories;
