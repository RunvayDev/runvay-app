// src/components/ProductDetail.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton"; // Import the AddToCartButton

type Product = {
  _id: string; // Add _id to match the schema
  name: string;
  description: string;
  price: number;
  stock: number;
  size: string[];
  color: string[];
  images: string[];
  slug: string;
};

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.size[0]);
  const [selectedColor, setSelectedColor] = useState(product.color[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images Section */}
        <div className="md:w-1/2">
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden border">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          {/* Thumbnail images */}
          <div className="flex space-x-2 mt-4">
            {product.images.map((image) => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`w-16 h-16 border rounded overflow-hidden ${
                  image === selectedImage ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="mb-4">
            <span className="text-2xl font-semibold text-red-500">
              ₹{product.price}
            </span>
          </div>
          <p className="mb-6 text-gray-700">{product.description}</p>

          {/* Stock Status */}
          <div className="mb-4">
            <p
              className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {product.stock > 0
                ? `${product.stock} items in stock`
                : "Out of stock"}
            </p>
          </div>

          {/* Size Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            >
              {product.size.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex space-x-2">
              {product.color.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border ${
                    color === selectedColor ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <AddToCartButton
            product={{
              _id: product._id, // Ensure _id is passed
              name: product.name,
              price: product.price,
              slug: product.slug,
              images: product.images,
            }}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />
        </div>
      </div>
    </div>
  );
}