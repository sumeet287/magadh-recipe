import { Typography } from "@/lib/ui/typography/typography";

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Master Madhubani Artist",
    image: "https://i.pravatar.cc/150?img=11",
    quote:
      "Bihar Bazaar ne humari kala ko duniya ke saamne laane mein madad ki hai. Ab hum directly customers se connect kar paate hain.",
  },
  {
    name: "Sunita Devi",
    role: "Tikuli Art Expert",
    image: "https://i.pravatar.cc/150?img=5",
    quote:
      "Digital platform par hamari puraani kala ko naya jeevan mila hai. Bahut se logon tak humari kahani pahunch rahi hai.",
  },
  {
    name: "Amit Singh",
    role: "Art Collector",
    image: "https://i.pravatar.cc/150?img=12",
    quote:
      "Bihar Bazaar ne authentic crafts ko affordable prices par accessible banaya hai. Quality and authenticity dono hi excellent hai.",
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
            seoTitle="Voices from Bihar's Craft Community"
            align="center"
          >
            Voices from <span className="text-bihar-mustard">Bihar&apos;s</span>{" "}
            Craft Community
          </Typography>
          <Typography
            variant="p"
            weight="medium"
            className="text-stone-400 max-w-2xl mx-auto"
            align="center"
          >
            Hear from the artisans and customers who form our growing community
            of craft enthusiasts.
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
