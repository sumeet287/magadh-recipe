import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SitaDevi from "@/assets/artist/Smt_Sita_Devi.png";
import DulariDevi from "@/assets/artist/Smt_Dulari_Devi.jpg";
import KalpanaDevi from "@/assets/artist/Smt_Kalpana_Devi.png";
import ManishaJha from "@/assets/artist/Smt_Manisha_Devi.png";
export const metadata: Metadata = {
  title: "Artist Directory | Bihar Bazaar",
  description: "Meet the skilled artisans behind Bihar's traditional crafts",
};

const artisans = [
  {
    id: 1,
    name: "Smt. Sita Devi",
    title: "Padma Shri Awardee",
    craft: "Madhubani Art",
    location: "Madhubani, Bihar",
    experience: "40+ years",
    image: SitaDevi,
    awards: ["Padma Shri", "National Award"],
    link: "/artists/sita-devi",
  },
  {
    id: 2,
    name: "Shri Manish Jha",
    title: "Master Artisan",
    craft: "Tikuli Art",
    location: "Patna, Bihar",
    experience: "25+ years",
    image: ManishaJha,
    awards: ["State Award"],
    link: "/artists/manish-jha",
  },
  {
    id: 3,
    name: "Smt. Dulari Devi",
    title: "National Award Winner",
    craft: "Madhubani Art",
    location: "Madhubani, Bihar",
    experience: "30+ years",
    image: DulariDevi,
    awards: ["National Award"],
    link: "/artists/dulari-devi",
  },
  {
    id: 4,
    name: "Shri Rajesh Kumar",
    title: "Expert Craftsman",
    craft: "Wood Carving",
    location: "Muzaffarpur, Bihar",
    experience: "20+ years",
    image: SitaDevi,
    awards: ["District Award"],
    link: "/artists/rajesh-kumar",
  },
  {
    id: 5,
    name: "Smt. Kalpana Devi",
    title: "State Award Winner",
    craft: "Glass Art",
    location: "Gaya, Bihar",
    experience: "15+ years",
    image: KalpanaDevi,
    awards: ["State Award"],
    link: "/artists/kalpana-devi",
  },
  {
    id: 6,
    name: "Shri Amit Verma",
    title: "Traditional Artist",
    craft: "Madhubani Art",
    location: "Darbhanga, Bihar",
    experience: "18+ years",
    image: SitaDevi,
    awards: ["Regional Award"],
    link: "/artists/amit-verma",
  },
];

export default function ArtistDirectoryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Meet Our Artisans
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-200">
            Discover the skilled craftspeople who are preserving and innovating
            Bihar&apos;s rich artistic heritage
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search artisans..."
              className="bg-white dark:bg-slate-800"
            />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select craft" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="madhubani">Madhubani Art</SelectItem>
                <SelectItem value="tikuli">Tikuli Art</SelectItem>
                <SelectItem value="wood">Wood Carving</SelectItem>
                <SelectItem value="glass">Glass Art</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="awards">Awards</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <Link key={artisan.id} href={artisan.link} className="block group">
              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={artisan.image}
                    alt={artisan.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {artisan.name}
                  </h2>
                  <p className="text-orange-600 dark:text-orange-400 font-medium mb-2">
                    {artisan.title}
                  </p>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <p>🎨 {artisan.craft}</p>
                    <p>📍 {artisan.location}</p>
                    <p>⭐ {artisan.experience}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {artisan.awards.map((award, index) => (
                      <span
                        key={`${artisan.id}-award-${index}`}
                        className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-full"
                      >
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
