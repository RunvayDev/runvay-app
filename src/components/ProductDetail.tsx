"use client";

import { useState } from "react";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";  
import { Star} from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Product = {
  _id: string;  
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
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images Section */}
          <div>
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden border">
              <Image
                src={selectedImage || "/placeholder.svg"}
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
                    image === selectedImage ? "ring-2 ring-black" : ""
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
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
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">(123 reviews)</span>
            </div>
            <div className="mb-4">
              <span className="text-2xl font-semibold">₹{product.price}</span>
            </div>
            <p className="mb-6 text-gray-700">{product.description}</p>

            <Separator className="my-6" />

            {/* Size Selector */}
            <div className="mb-6">
              <Label className="text-base">Size</Label>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-2 mt-2"
              >
                {product.size.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-gray-900 peer-data-[state=checked]:text-white"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <Label className="text-base">Color</Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-2 mt-2"
              >
                {product.color.map((color) => (
                  <div key={color}>
                    <RadioGroupItem
                      value={color}
                      id={`color-${color}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-black"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator className="my-6" />

            {/* Stock Status */}
            <div className="mb-6">
              <p
                className={`text-sm ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} items in stock`
                  : "Out of stock"}
              </p>
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
      </CardContent>
    </Card>
  );
}