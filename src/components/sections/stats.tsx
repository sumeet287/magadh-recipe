export function StatsSection() {
  return (
    <section className="py-16 bg-orange-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-orange-600">1000+</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Artisans Supported
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-orange-600">50+</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Years of Heritage
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-orange-600">100+</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Craft Varieties
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-orange-600">5000+</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Products Delivered
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
