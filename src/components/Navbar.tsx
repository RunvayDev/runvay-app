"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react"; // Import NextAuth functions
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ButtonComponent from "./ButtonComponent";
import CartIcon from "@/components/CartIcon";
import { useSession } from "next-auth/react"; // Import NextAuth functions

interface Product {
  name: string;
  description?: string;
  price: number;
  stock: number;
  size?: string[];
  color?: string[];
  images: string[];
  slug: string;
}

interface NavbarProps {
  products: Product[];
}

const Navbar = ({ products }: NavbarProps) => {
  const { data: session } = useSession(); // Get user session

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (query: string) => {
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/"; // Full page reload
            }}
          >
            <Image src="/runvay(logo).jpg" width={120} height={40} alt="logo" />
          </Link>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav
          className={`${isMenuOpen ? "flex flex-col absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-10" : "hidden"} lg:flex lg:items-center lg:space-x-4 lg:static lg:shadow-none lg:p-0`}
        >
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Other menu items */}
            <li>
              <Link
                href={{ pathname: "/search", query: { q: "Shirt" } }}
                className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Shirts
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/search", query: { q: "T-Shirt" } }}
                className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                T-Shirts
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/search", query: { q: "Hoodie" } }}
                className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Hoodies
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                My Orders
              </Link>
            </li>
          </ul>
          <div
            className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-2 mt-4 lg:mt-0"
            ref={searchRef}
          >
            <div className="relative w-full lg:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSearchSubmit(searchQuery)
                }
                placeholder="Search..."
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => handleSearchSubmit(searchQuery)}
              >
                <Image
                  src="/search-icon.svg"
                  height={30}
                  width={30}
                  alt="search-icon"
                />
              </button>

              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((product) => (
                    <div
                      key={product.slug}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleSearchSubmit(product.name)}
                    >
                      <Image
                        src={product.images[0]} // Assuming there's at least one image
                        width={40}
                        height={40}
                        alt={product.name}
                        className="rounded-md mr-2"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">
                          ₹{product.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
              <div className="mr-1">

            <CartIcon />
              </div>

            <div className="relative" ref={profileRef}>
              {session ? (
                <>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="border border-black rounded-full p-1 flex items-center"
                  >
                    <Image
                      src="/profile.svg"
                      width={30}
                      height={30}
                      alt="profile"
                    />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-md border rounded-md z-50">
                      <ul className="py-2">
                        <li>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/settings"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Settings
                          </Link>
                        </li>
                        <li>
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              signOut({ callbackUrl: "/" });
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="border-2 border-black rounded-lg">
                  <ButtonComponent
                    ButtonName="Sign Up / Login"
                    TextColor="text-black"
                    ButtonColor1="bg-transparent-500"
                    ButtonColor2="hover:bg-gray-200"
                    width="w-35"
                    onClick={() => router.push("/signin")}
                  />
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
