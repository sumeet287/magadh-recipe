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
    title: "Mango Pickle",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    description:
      "Handmade mango pickle using age-old Magadh Recipe, bursting with authentic Bihari flavors.",
    link: "/crafts/mango",
  },
  {
    title: "Lemon Pickle",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    description:
      "Tangy and spicy lemon pickle, sun-cured and handmade in Bihar.",
    link: "/crafts/lemon",
  },
  {
    title: "Mixed Vegetable Pickle",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    description:
      "A medley of seasonal vegetables pickled with traditional Bihari spices.",
    link: "/crafts/mixed",
  },
  {
    title: "Green Chili Pickle",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    description:
      "Spicy green chili pickle, a Magadh Recipe specialty.",
    link: "/crafts/chili",
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
            Explore <span className="text-bihar-turquoise">Pickle</span>{" "}
            Categories
          </Typography>
          <Typography
            variant="p"
            color="secondary"
            align="center"
            className="max-w-2xl mx-auto"
          >
            Dive into Bihar&apos;s diverse pickle traditions, each with its
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
