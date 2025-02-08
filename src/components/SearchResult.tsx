"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Product {
  name: string;
  description?: string;
  price: number;
  stock: number;
  size: string[];
  color: string[];
  images: string[];
  slug: string;
}

interface SearchProps {
  products: Product[];
}

const SearchResult = ({ products }: SearchProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
    sortBy: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);

  const uniqueColors = [...new Set(products.flatMap((p) => p.color))];
  const uniqueSizes = [...new Set(products.flatMap((p) => p.size))];

  // Show only first 5 colors unless showAll is true
  const visibleColors = showAllColors ? uniqueColors : uniqueColors.slice(0, 5);

  const handleColorChange = (color: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      colors: prevFilters.colors.includes(color)
        ? prevFilters.colors.filter((c) => c !== color)
        : [...prevFilters.colors, color],
    }));
  };

  const handleSizeChange = (size: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sizes: prevFilters.sizes.includes(size)
        ? prevFilters.sizes.filter((s) => s !== size)
        : [...prevFilters.sizes, size],
    }));
  };

  useEffect(() => {
    let results = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery),
    );

    // Apply color filter
    if (filters.colors.length > 0) {
      results = results.filter((product) =>
        product.color.some((color) => filters.colors.includes(color)),
      );
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      results = results.filter((product) =>
        product.size.some((size) => filters.sizes.includes(size)),
      );
    }

    // Sort products
    if (filters.sortBy === "price_low") {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price_high") {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(results);
  }, [searchQuery, filters, products]);

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      {/* Filter Section for Large Screens */}
      <div className="bg-gray-100 hidden lg:block w-1/5 h-auto min-h-0 self-start p-2 border rounded-md border-gray-400">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="space-y-4 mb-4 border-black border-b pb-4">
          {/* Color Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex flex-col space-y-1 mb-4 border-black border-b pb-4">
              {visibleColors.map((color) => (
                <label key={color} className="inline-flex items-center py-2">
                  <input
                    type="checkbox"
                    value={color}
                    checked={filters.colors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="mr-2"
                  />
                  <span
                    style={{ backgroundColor: color, opacity: 0.7 }}
                    className="lg:w-5 lg:h-5 w-4 h-4 rounded-full mr-2 shadow-[0_0_0_1px_#000]"
                  ></span>
                  {color}
                </label>
              ))}
              {uniqueColors.length > 5 && (
                <button
                  onClick={() => setShowAllColors(!showAllColors)}
                  className="text-black-500 text-sm mt-2  hover:text-blue-400 underline"
                >
                  {showAllColors ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Size</h3>
            <div className="flex flex-col space-y-1 mb-4 border-black border-b pb-4">
              {uniqueSizes.map((size) => (
                <label key={size} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={size}
                    checked={filters.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Sort By Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Sort By</h3>
            <select
              className="w-full border p-2"
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
              value={filters.sortBy}
            >
              <option value="">Select</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="m-4">
        <button
          className="lg:hidden sticky fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded z-50 w-fit"
          onClick={() => setIsFilterOpen(true)}
        >
          Show Filters
        </button>
      </div>

      {/* Mobile Filter Section */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="w-3/4 max-w-sm bg-white h-full p-4 shadow-lg overflow-y-auto">
            <button
              className="text-red-500 text-lg mb-4"
              onClick={() => setIsFilterOpen(false)}
            >
              ✕ Close
            </button>
            <h2 className="text-xl font-bold mb-4 border-black border-b pb-4">
              Filters
            </h2>
            {/* Color Filter */}
            <div className="space-y-4 mb-4 border-black border-b pb-4 ">
              <span className="font-bold">Colors</span>
              {visibleColors.map((color) => (
                <label key={color} className="block">
                  <input
                    type="checkbox"
                    value={color}
                    checked={filters.colors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="mr-2"
                  />
                  <span
                    style={{ backgroundColor: color, opacity: 0.7 }}
                    className="w-4 h-4 inline-block  rounded-full mr-2 shadow-[0_0_0_1px_#000]"
                  ></span>
                  {color}
                </label>
              ))}
              {uniqueColors.length > 5 && (
                <button
                  onClick={() => setShowAllColors(!showAllColors)}
                  className="text-black-500 text-sm mt-2  hover:underline"
                >
                  {showAllColors ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            {/* Size Filter */}
            <div className="space-y-4 mb-4 border-black border-b pb-4">
              {uniqueSizes.map((size) => (
                <label key={size} className="block">
                  <input
                    type="checkbox"
                    value={size}
                    checked={filters.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Sort By</h3>
              <select
                className="w-full border p-2"
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
                value={filters.sortBy}
              >
                <option value="">Select</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">
          {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
        </h1>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-600 text-center">No products found.</p>
        ) : (
          <div className="py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr justify-items-center">
            {filteredProducts.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
