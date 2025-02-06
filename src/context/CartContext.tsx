"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
  slug?: string; // Added slug
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  syncCart: (loggedIn: boolean, userCart?: CartItem[]) => void;
  updateQuantity: (productId: string, quantity: number) => void; // Added updateQuantity
  setCart: (cartItems: CartItem[]) => void; // Add this line

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setCartHandler = (newCart: CartItem[]) => {
    setCart(newCart);
  };

  // Load cart from local storage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Sync cart to local storage whenever it changes (if not logged in)
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoggedIn]);

  const addToCart = async (item: CartItem) => {
    if (isLoggedIn) {
      // Update MongoDB cart for logged-in users
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const updatedCart = await response.json();
      setCart(updatedCart.cart);
    } else {
      // Update local storage cart for guest users
      setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem.productId === item.productId);
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        }
        return [...prevCart, item];
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (isLoggedIn) {
      // Remove from MongoDB cart for logged-in users
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const updatedCart = await response.json();
      setCart(updatedCart.cart);
    } else {
      // Remove from local storage cart for guest users
      setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    }
  };

  const clearCart = async () => {
    if (isLoggedIn) {
      // Clear MongoDB cart for logged-in users
      await fetch("/api/cart/clear", { method: "POST" });
      setCart([]);
    } else {
      // Clear local storage cart for guest users
      setCart([]);
    }
  };

  const syncCart = async (loggedIn: boolean, userCart?: CartItem[]) => {
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      // Sync local storage cart with MongoDB cart
      if (userCart) {
        const mergedCart = [...userCart];
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

        for (const localItem of localCart) {
          const existingItem = mergedCart.find((item) => item.productId === localItem.productId);
          if (existingItem) {
            existingItem.quantity += localItem.quantity;
          } else {
            mergedCart.push(localItem);
          }
        }

        // Update the database with the merged cart
        await fetch("/api/cart/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: mergedCart }),
        });

        setCart(mergedCart);
        localStorage.removeItem("cart");
      }
    } else {
      // Switch to local storage cart for logged-out users
      const storedCart = localStorage.getItem("cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, syncCart, updateQuantity, setCart: setCartHandler  }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
