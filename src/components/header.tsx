"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Search, Menu } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProfileSection } from "./auth/profile-section";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import AuthPage from "./auth/auth-modal";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Header() {
  const { cart, wishlist } = useCart();
  const { isAuthenticated, checkAuth } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Check auth on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-1">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[350px] pt-10">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                {/* <div className="relative w-full mb-4">
                  <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search crafts..."
                    className="w-full pl-8 rounded-full bg-gray-100 focus-visible:ring-orange-600"
                  />
                </div> */}
                <SheetClose asChild>
                  <Link
                    href="/crafts"
                    className="py-2 text-base font-medium hover:text-orange-600 transition-colors"
                  >
                    Categories
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/artisans"
                    className="py-2 text-base font-medium hover:text-orange-600 transition-colors"
                  >
                    Artisans
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/products"
                    className="py-2 text-base font-medium hover:text-orange-600 transition-colors"
                  >
                    All Products
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="py-2 text-base font-medium hover:text-orange-600 transition-colors"
                  >
                    Our Story
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className="py-2 text-base font-medium hover:text-orange-600 transition-colors"
                  >
                    Blog
                  </Link>
                </SheetClose>
                {!isAuthenticated && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4 w-full text-amber-600 bg-white border-2 border-amber-600 hover:bg-amber-600 hover:text-white transition-colors">
                        Login
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm p-0 bg-transparent shadow-none">
                      <DialogTitle className="sr-only">Login</DialogTitle>
                      <AuthPage />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Bihar_Bazaar.png"
              alt="Bihar Bazaar Logo"
              width={40}
              height={40}
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="text-lg md:text-xl font-bold text-orange-600">
              Bihar Bazaar
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/crafts"
            className="text-sm font-medium hover:text-orange-600 transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/artisans"
            className="text-sm font-medium hover:text-orange-600 transition-colors"
          >
            Artisans
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium hover:text-orange-600 transition-colors"
          >
            All Products
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-orange-600 transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-orange-600 transition-colors"
          >
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Desktop search */}
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search crafts..."
              className="w-[200px] pl-8 rounded-full bg-gray-100 focus-visible:ring-orange-600"
            />
          </div>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                >
                  {wishlist.length}
                </Badge>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                >
                  {cart.length}
                </Badge>
              )}
            </Link>
          </Button>
          <div className="hidden md:flex items-center gap-2 ml-4">
            {isAuthenticated ? (
              <ProfileSection />
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Login</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm p-0 bg-transparent shadow-none">
                  <DialogTitle className="sr-only">Login</DialogTitle>
                  <AuthPage />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar (expandable) */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3 bg-white">
          <div className="relative w-full">
            <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search crafts..."
              className="w-full pl-8 rounded-full bg-gray-100 focus-visible:ring-orange-600"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
