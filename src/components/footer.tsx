import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Bihar Bazaar</h3>
            <p className="text-slate-300">
              Promoting and preserving Bihar&apos;s rich handicraft heritage
              through digital innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-orange-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/crafts"
                  className="text-slate-300 hover:text-orange-400"
                >
                  Our Crafts
                </Link>
              </li>
              <li>
                <Link
                  href="/artisans"
                  className="text-slate-300 hover:text-orange-400"
                >
                  Artisans
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-300 hover:text-orange-400"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-2 text-slate-300">
              <li>Bihar Bazaar, Patna</li>
              <li>Phone: +91 XXXXXXXXXX</li>
              <li>Email: contact@biharbazaar.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-slate-300">
              Subscribe for latest updates and offers
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700"
              />
              <Button variant={"secondary"}>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>© 2024 Bihar Bazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
