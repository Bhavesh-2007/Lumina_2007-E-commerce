export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  isNew?: boolean;
  isOnSale?: boolean;
  specs?: Record<string, string>;
  userReviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped';
  items: CartItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  orders: Order[];
  wishlist: number[];
}

export type ViewState = 'home' | 'shop' | 'product-details' | 'cart' | 'checkout' | 'admin' | 'profile' | 'create-shop';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}