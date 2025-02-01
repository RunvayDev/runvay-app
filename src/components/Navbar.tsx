"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image src="/Runvay(logo).jpg" width={120} height={40} alt="logo"/>
          </Link>
        </div>

        {/* Mobile Menu Button (responsiveness)*/}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className={`${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-white p-4 shadow-md' : 'hidden'} lg:flex lg:items-center lg:space-x-4 lg:static lg:shadow-none lg:p-0`}>
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <li>
              <Link href="/men" className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">Shirts</Link>
            </li>
            <li>
              <Link href="/women" className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">T-Shirts</Link>
            </li>
            <li>
              <Link href="/kids" className="relative text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">Hoodies</Link>
            </li>
          </ul>
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-2 mt-4 lg:mt-0 ">
            <input 
              type="text" 
              placeholder="Search..." 
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-1 py-1">
                <Image src='/search-icon.svg' height={30} width={30} alt="search-icon"></Image>
            </button>
            <Link href="/">
              <Image src="/shopping-cart.svg" width={30} height={30} alt="logo"/>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
