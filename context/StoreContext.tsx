import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, ViewState, User, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  view: ViewState;
  setView: (view: ViewState) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  isDarkMode: boolean;
  toggleTheme: () => void;
  
  user: User | null;
  login: () => void;
  logout: () => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Navigation & Search State
  const [view, setView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // User State
  const [user, setUser] = useState<User | null>(null);

  // Effects
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Profile / User Logic
  const login = () => {
    // Mock user with some history
    setUser({
      id: '123',
      name: 'Alex Doe',
      email: 'alex@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      orders: [
        {
          id: '#ORD-2023-8892',
          date: 'Dec 12, 2023',
          total: 184.49,
          status: 'Delivered',
          items: [
            { ...MOCK_PRODUCTS[3], quantity: 1 }, 
            { ...MOCK_PRODUCTS[1], quantity: 1 }
          ]
        },
        {
          id: '#ORD-2024-1002',
          date: 'Jan 05, 2024',
          total: 299.99,
          status: 'Processing',
          items: [
            { ...MOCK_PRODUCTS[0], quantity: 1 }
          ]
        }
      ],
      wishlist: [2, 5]
    });
  };

  const logout = () => {
    setUser(null);
    setView('home');
  };

  const toggleWishlist = (productId: number) => {
    if (!user) {
      login(); // Auto-login for demo purposes if trying to wishlist
      return;
    }
    
    setUser(prev => {
      if (!prev) return null;
      const isPresent = prev.wishlist.includes(productId);
      const newWishlist = isPresent 
        ? prev.wishlist.filter(id => id !== productId)
        : [...prev.wishlist, productId];
      return { ...prev, wishlist: newWishlist };
    });
  };

  const isInWishlist = (productId: number) => {
    return user?.wishlist.includes(productId) || false;
  };

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
      view, setView, selectedProduct, setSelectedProduct,
      isDarkMode, toggleTheme,
      user, login, logout,
      searchQuery, setSearchQuery,
      toggleWishlist, isInWishlist
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
