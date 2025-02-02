"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-1">
              <Image
                src="/runvay-bl.jpg"
                width={120}
                height={40}
                alt="logo"
                className="brightness-100"
              />
            </div>
            <p className="text-sm mb-4">
              Your one-stop destination for trendy and comfortable clothing.
              Discover fashion that speaks to you.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                <Phone size={18} />
                <span>1234567....</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                <Mail size={18} />
                <span>mail....</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                <MapPin size={18} />
                <span>address....</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors duration-300"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-white transition-colors duration-300"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-white transition-colors duration-300"
                >
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={{ pathname: "/search", query: { q: "Shirts" } }}
                  className="hover:text-white transition-colors duration-300"
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/search", query: { q: "T-Shirts" } }}
                  className="hover:text-white transition-colors duration-300"
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/search", query: { q: "Hoodies" } }}
                  className="hover:text-white transition-colors duration-300"
                >
                  Hoodies
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 Runvay. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
