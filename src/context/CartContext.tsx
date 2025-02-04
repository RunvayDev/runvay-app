 // app/context/CartContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  slug: string;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, newQuantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('runvayCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('runvayCart', JSON.stringify(items));
  };

  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.productId === product.productId &&
        item.size === product.size &&
        item.color === product.color
      );

      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.productId === product.productId &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
        saveToLocalStorage(updatedItems);
        return updatedItems;
      }

      const newItems = [...prevItems, product];
      saveToLocalStorage(newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCartItems(prevItems => {
      const filteredItems = prevItems.filter(item => 
        !(item.productId === productId && item.size === size && item.color === color)
      );
      saveToLocalStorage(filteredItems);
      return filteredItems;
    });
  };

  const updateQuantity = (productId: string, size: string, color: string, newQuantity: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      );
      saveToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('runvayCart');
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);