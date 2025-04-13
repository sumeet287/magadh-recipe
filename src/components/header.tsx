import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import MobileNavigation from "@/components/MobileNavigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Bihar Bazaar Logo"
                width={100}
                height={100}
                className="dark:invert"
              />
              <span className="text-xl font-bold text-orange-600">
                Bihar Bazaar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="px-4 py-2 hover:text-orange-600">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Crafts Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Crafts</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {[
                      {
                        href: "/crafts/madhubani",
                        title: "Madhubani Art",
                        description: "Traditional Mithila painting styles",
                      },
                      {
                        href: "/crafts/tikuli",
                        title: "Tikuli Art",
                        description: "Ancient Bihari craft of decorative art",
                      },
                      {
                        href: "/crafts/wood",
                        title: "Wood Craft",
                        description: "Traditional wooden artifacts",
                      },
                      {
                        href: "/crafts/glass",
                        title: "Glass Art",
                        description: "Contemporary glass artwork",
                      },
                    ].map((item) => (
                      <li
                        key={item.href}
                        className="hover:bg-slate-100 p-2 rounded"
                      >
                        <Link href={item.href} className="block">
                          <div className="text-sm font-medium">
                            {item.title}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Artisans Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Artisans</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li className="hover:bg-slate-100 p-2 rounded">
                      <Link href="/artisans/directory" className="block">
                        <div className="text-sm font-medium">
                          Artist Directory
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Explore our talented artisan community
                        </p>
                      </Link>
                    </li>
                    <li className="hover:bg-slate-100 p-2 rounded">
                      <Link href="/artisans/stories" className="block">
                        <div className="text-sm font-medium">
                          Artist Stories
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Read about our master craftspeople
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/events"
                    className="px-4 py-2 hover:text-orange-600"
                  >
                    Events
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/blog"
                    className="px-4 py-2 hover:text-orange-600"
                  >
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/products"
                    className="px-4 py-2 hover:text-orange-600"
                  >
                    Shop
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <MobileNavigation />

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
