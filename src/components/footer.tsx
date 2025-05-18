import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import MagadhLogo from "@/assets/art/Magadh_Logo.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={MagadhLogo}
                alt="Magadh Recipe Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-orange-600">
                Magadh Recipe
              </span>
            </Link>
            <p className="mb-4">
              Bihar's premier destination for authentic handmade pickles. Bringing the taste of tradition from local women pickle makers to your table.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="hover:text-orange-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="hover:text-orange-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="hover:text-orange-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="hover:text-orange-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-orange-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-orange-600 transition-colors"
                >
                  Shop All Pickles
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-orange-600 transition-colors"
                >
                  Pickle Varieties
                </Link>
              </li>
              <li>
                <Link
                  href="/artisans"
                  className="hover:text-orange-600 transition-colors"
                >
                  Pickle Makers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-orange-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-orange-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Pickle Varieties</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/category/mango-pickle"
                  className="hover:text-orange-600 transition-colors"
                >
                  Mango Pickle
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/lemon-pickle"
                  className="hover:text-orange-600 transition-colors"
                >
                  Lemon Pickle
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/mixed-pickle"
                  className="hover:text-orange-600 transition-colors"
                >
                  Mixed Pickle
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/chilli-pickle"
                  className="hover:text-orange-600 transition-colors"
                >
                  Chilli Pickle
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/jackfruit-pickle"
                  className="hover:text-orange-600 transition-colors"
                >
                  Jackfruit Pickle
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/ginger-pickle"
                  className="hover:text-orange-600 transition-colors"
                >
                  Ginger Pickle
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Contact Us</h3>
            <address className="not-italic space-y-2">
              <p>123 Pickle Street, Patna</p>
              <p>Bihar, India 800001</p>
              <p className="mt-4">
                <a
                  href="tel:+919876543210"
                  className="hover:text-orange-600 transition-colors"
                >
                  +91 98765 43210
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@magadhrecipe.com"
                  className="hover:text-orange-600 transition-colors"
                >
                  info@magadhrecipe.com
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Magadh Recipe. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              href="/privacy-policy"
              className="hover:text-orange-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-condition"
              className="hover:text-orange-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/shipping-policy"
              className="hover:text-orange-600 transition-colors"
            >
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
