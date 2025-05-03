import { Metadata } from "next";
import Image from "next/image";
import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "About Us | Bihar Bazaar",
  description:
    "Learn about Bihar Bazaar's mission to promote and preserve Bihar's rich cultural heritage through traditional handicrafts.",
};

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                  Preserving Bihar&apos;s
                  <span className="block text-orange-600 mt-2">
                    Cultural Heritage
                  </span>
                </h1>
                <p className="text-lg text-slate-700 dark:text-slate-200">
                  Bihar Bazaar is dedicated to bringing the rich artistic
                  traditions of Bihar to the global stage. We connect skilled
                  artisans with art lovers worldwide, ensuring fair compensation
                  and sustainable livelihoods.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={madhubaniArt}
                  alt="Bihar's Cultural Heritage"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white/80 dark:bg-slate-800/80">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Our Mission
                </h2>
                <p className="text-slate-700 dark:text-slate-200">
                  To create a sustainable digital marketplace that preserves and
                  promotes Bihar&apos;s traditional crafts while empowering
                  local artisans through fair trade practices and global market
                  access.
                </p>
                <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    Supporting traditional artisans
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    Preserving cultural heritage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    Promoting sustainable practices
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Our Vision
                </h2>
                <p className="text-slate-700 dark:text-slate-200">
                  We envision a future where Bihar&apos;s traditional crafts are
                  recognized and celebrated globally, ensuring the preservation
                  of our cultural heritage for generations to come.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-orange-100 dark:bg-slate-700">
                    <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      500+
                    </h3>
                    <p className="text-slate-700 dark:text-slate-200">
                      Artisans Supported
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-orange-100 dark:bg-slate-700">
                    <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      1000+
                    </h3>
                    <p className="text-slate-700 dark:text-slate-200">
                      Products Listed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-white/80 dark:bg-slate-800/80 space-y-4">
                <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  Artisan Empowerment
                </h3>
                <p className="text-slate-700 dark:text-slate-200">
                  Providing fair wages and sustainable income opportunities to
                  traditional craftspeople across Bihar.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/80 dark:bg-slate-800/80 space-y-4">
                <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  Cultural Preservation
                </h3>
                <p className="text-slate-700 dark:text-slate-200">
                  Documenting and preserving traditional craft techniques for
                  future generations.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/80 dark:bg-slate-800/80 space-y-4">
                <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  Global Recognition
                </h3>
                <p className="text-slate-700 dark:text-slate-200">
                  Bringing Bihar&apos;s rich cultural heritage to the global
                  marketplace.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
