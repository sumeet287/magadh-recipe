import {
  Home,
  Circle,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Menu,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] overflow-y-auto bg-white"
      >
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-semibold text-orange-600">
            Navigation Menu
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col py-4">
          <Link
            href="/"
            className="flex items-center px-2 py-3 text-base font-medium hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>

          {/* Crafts Section */}
          <div className="mt-2">
            <h2 className="px-2 py-3 text-base font-semibold text-gray-900">
              Crafts
            </h2>
            <div className="pl-4 space-y-1">
              <Link
                href="/crafts/madhubani"
                className="flex items-center px-2 py-2.5 text-[15px] text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
              >
                <Circle className="w-2 h-2 mr-3 fill-current" />
                Madhubani Art
              </Link>
              <Link
                href="/crafts/tikuli"
                className="flex items-center px-2 py-2.5 text-[15px] text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
              >
                <Circle className="w-2 h-2 mr-3 fill-current" />
                Tikuli Art
              </Link>
              <Link
                href="/crafts/wood"
                className="flex items-center px-2 py-2.5 text-[15px] text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
              >
                <Circle className="w-2 h-2 mr-3 fill-current" />
                Wood Craft
              </Link>
              <Link
                href="/crafts/glass"
                className="flex items-center px-2 py-2.5 text-[15px] text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
              >
                <Circle className="w-2 h-2 mr-3 fill-current" />
                Glass Art
              </Link>
            </div>
          </div>

          {/* Artisans Section */}
          <div className="mt-2">
            <h2 className="px-2 py-3 text-base font-semibold text-gray-900">
              Artisans
            </h2>
            <div className="pl-4 space-y-1">
              <Link
                href="/artisans/directory"
                className="flex items-center px-2 py-2.5 text-[15px] text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
              >
                <Users className="w-4 h-4 mr-3" />
                Artist Directory
              </Link>
              <Link
                href="/artisans/stories"
                className="flex items-center px-2 py-2.5 text-[15px] text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 mr-3" />
                Artist Stories
              </Link>
            </div>
          </div>

          <Link
            href="/events"
            className="flex items-center px-2 py-3 mt-2 text-base font-medium hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
          >
            <Calendar className="w-5 h-5 mr-3" />
            Events
          </Link>

          <Link
            href="/blog"
            className="flex items-center px-2 py-3 text-base font-medium hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
          >
            <FileText className="w-5 h-5 mr-3" />
            Blog
          </Link>

          <div className="flex flex-col gap-3 mt-6 px-2">
            <Button
              asChild
              variant="outline"
              className="w-full py-5 text-base font-medium border-2 hover:bg-orange-50"
            >
              <Link href="/auth/signin">Login</Link>
            </Button>
            <Button
              asChild
              className="w-full py-5 text-base font-medium hover:bg-orange-600"
            >
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
