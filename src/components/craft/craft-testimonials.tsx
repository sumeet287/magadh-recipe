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
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-white mb-4">
            Voices from <span className="text-bihar-mustard">Bihar&apos;s</span>{" "}
            Craft Community
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            Hear from the artisans and customers who form our growing community
            of craft enthusiasts.
          </p>
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
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-stone-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <blockquote className="relative">
                <span className="text-4xl text-bihar-mustard absolute -top-4 -left-2 opacity-50">
                  &ldquo;
                </span>
                <p className="text-stone-300 relative z-10 pl-3">
                  {testimonial.quote}
                </p>
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
