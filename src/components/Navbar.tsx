"use client"
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ButtonComponent from "./ButtonComponent";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Sample product data - in a real app, this would come from your database
  const products: Product[] = [
    { id: "1", name: "Classic White Shirt", category: "Shirts", price: 49.99, image: "/sample-hoodie.jpg" },
    { id: "2", name: "Black T-Shirt", category: "T-Shirts", price: 24.99, image: "/sample-hoodie.jpg" },
    { id: "3", name: "Gray Hoodie", category: "Hoodies", price: 59.99, image: "/sample-hoodie.jpg" },
    // Add more products as needed
  ];

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
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
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
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
          <Link href="/">
            <Image src="/runvay-bl.jpg" width={120} height={40} alt="logo" />
          </Link>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className={`${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-10' : 'hidden'} lg:flex lg:items-center lg:space-x-4 lg:static lg:shadow-none lg:p-0`}>
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <li>
            <Link href={{ pathname: "/search", query: { q: "Shirts" } }} passHref>
              <span className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
                Shirts
              </span>
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/search", query: { q: "T-Shirts" } }} passHref>
              <span className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
                T-Shirts
              </span>
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/search", query: { q: "Hoodies" } }} passHref>
              <span className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
                Hoodies
              </span>
            </Link>
</li>
            <li>
              <Link href="/" className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">My Orders</Link>
            </li>
          </ul>
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-2 mt-4 lg:mt-0" ref={searchRef}>
            <div className="relative w-full lg:w-auto">
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearch}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(searchQuery)}
                placeholder="Search..." 
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => handleSearchSubmit(searchQuery)}
              >
                <Image src='/search-icon.svg' height={30} width={30} alt="search-icon" />
              </button>
              
              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((product) => (
                    <div
                      key={product.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleSearchSubmit(product.name)}
                    >
                      <Image
                        src={product.image}
                        width={40}
                        height={40}
                        alt={product.name}
                        className="rounded-md mr-2"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">${product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link href="/">
              <Image src="/shopping-cart.svg" width={30} height={30} alt="logo" />
            </Link>
          </div>
          {!isLoggedIn && (
            <div className="mt-4 lg:mt-0 border-2 border-black rounded-lg">
              <ButtonComponent ButtonName="Sign Up / Login" TextColor="text-black" ButtonColor1="bg-transparent-500" ButtonColor2="hover:bg-gray-200" />
            </div>
          )
          }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
