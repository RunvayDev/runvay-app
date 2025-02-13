'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

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
  isSyncing: boolean;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const { status } = useSession();

  // Merge server and local carts
  const mergeCarts = (serverCart: CartItem[], localCart: CartItem[]) => {
    const merged = [...serverCart];
    localCart.forEach(localItem => {
      const existing = merged.find(
        item =>
          item.productId === localItem.productId &&
          item.size === localItem.size &&
          item.color === localItem.color
      );
      if (existing) {
        existing.quantity += localItem.quantity;
      } else {
        merged.push(localItem);
      }
    });
    return merged;
  };

  // Synchronize cart between server and localStorage
  const syncCart = useCallback(async () => {
    setIsSyncing(true);
    try {
      if (status === 'authenticated') {
        const serverResponse = await fetch('/api/cart');
        const serverCart = await serverResponse.json();
        const localCart = JSON.parse(localStorage.getItem('runvayCart') || '[]');

        if (localCart.length > 0) {
          const mergedCart = mergeCarts(serverCart, localCart);
          await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems: mergedCart }),
          });
          localStorage.removeItem('runvayCart');
          setCartItems(mergedCart);
        } else {
          setCartItems(serverCart);
        }
      } else {
        const localCart = localStorage.getItem('runvayCart');
        setCartItems(localCart ? JSON.parse(localCart) : []);
      }
    } catch (error) {
      console.error('Cart sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [status]);

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const persistCart = useCallback(
    async (items: CartItem[]) => {
      try {
        setCartItems(items);
        if (status === 'authenticated') {
          await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems: items }),
          });
        } else {
          localStorage.setItem('runvayCart', JSON.stringify(items));
        }
      } catch (error) {
        console.error('Persist cart error:', error);
      }
    },
    [status]
  );

  const addToCart = (product: CartItem) => {
    const newCart = [...cartItems];
    const existing = newCart.find(
      item =>
        item.productId === product.productId &&
        item.size === product.size &&
        item.color === product.color
    );

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      newCart.push(product);
    }

    persistCart(newCart);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    const newCart = cartItems.filter(
      item => !(item.productId === productId && item.size === size && item.color === color)
    );
    persistCart(newCart);
  };

  const updateQuantity = (productId: string, size: string, color: string, newQuantity: number) => {
    const newCart = cartItems.map(item =>
      item.productId === productId && item.size === size && item.color === color
        ? { ...item, quantity: newQuantity }
        : item
    );
    persistCart(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
    if (status === 'authenticated') {
      persistCart([]);
    } else {
      localStorage.removeItem('runvayCart');
    }
  };

  // Handle cart persistence when user logs out
  useEffect(() => {
    if (status === 'unauthenticated') {
      // Save cart to localStorage
      localStorage.setItem('runvayCart', JSON.stringify(cartItems));
    }
  }, [status, cartItems]);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        isSyncing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
