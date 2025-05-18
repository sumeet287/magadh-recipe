import { Typography } from "@/lib/ui/typography/typography";

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Pickle Enthusiast",
    image: "https://i.pravatar.cc/150?img=11",
    quote:
      "Magadh Recipe ke pickles ne ghar ki yaad dila di! Bilkul waise hi swad, jaise maa banati thi.",
  },
  {
    name: "Sunita Devi",
    role: "Homemade Pickle Maker",
    image: "https://i.pravatar.cc/150?img=5",
    quote:
      "Apne pickles ko Magadh Recipe par bech kar mujhe naye customers mile. Pure aur handmade pickles ki demand badh gayi hai!",
  },
  {
    name: "Amit Singh",
    role: "Food Blogger",
    image: "https://i.pravatar.cc/150?img=12",
    quote:
      "Yahan ke pickles mein asli Bihar ka swad hai. Quality aur authenticity dono hi lajawab hai!",
  },
];

const CraftTestimonials = () => {
  return (
    <section className="py-16 bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Typography
            variant="h2"
            weight="bold"
            className="font-playfair text-white mb-4"
            seoTitle="Voices from Magadh Recipe Community"
            align="center"
          >
            Voices from <span className="text-bihar-mustard">Magadh Recipe</span> Community
          </Typography>
          <Typography
            variant="p"
            weight="medium"
            className="text-stone-400 max-w-2xl mx-auto"
            align="center"
          >
            Hear from the pickle makers and customers who form our growing community of Magadh Recipe lovers.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-stone-800 rounded-lg p-6 relative hover-scale"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-bihar-mustard"
                  />
                </div>
                <div>
                  <Typography variant="h4" className="text-white font-medium">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="p" className="text-stone-400 text-sm">
                    {testimonial.role}
                  </Typography>
                </div>
              </div>

              <blockquote className="relative">
                <span className="text-4xl text-bihar-mustard absolute -top-4 -left-2 opacity-50">
                  &ldquo;
                </span>
                <Typography
                  variant="blockquote"
                  className="text-stone-300 relative z-10 pl-3"
                >
                  {testimonial.quote}
                </Typography>
                <span className="text-4xl text-bihar-mustard absolute -bottom-8 right-0 opacity-50">
                  &rdquo;
                </span>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftTestimonials;
