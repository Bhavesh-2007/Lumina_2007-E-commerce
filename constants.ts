import { Product } from './types';

const MOCK_REVIEWS = [
  { id: 1, user: "Sarah J.", rating: 5, comment: "Absolutely love this! The quality is outstanding.", date: "2023-10-15" },
  { id: 2, user: "Mike T.", rating: 4, comment: "Great value for money, fast shipping too.", date: "2023-11-02" },
  { id: 3, user: "Emily R.", rating: 5, comment: "Exactly as described. Will buy again.", date: "2023-12-10" }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Montraa X1 Noise Cancelling Headphones",
    price: 299.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 124,
    image: "https://picsum.photos/600/600?random=1",
    description: "Experience silence like never before with the Montraa X1. Industry-leading noise cancellation meets premium audio fidelity.",
    isNew: true,
    specs: {
      "Battery Life": "30 Hours",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "250g",
      "Noise Cancellation": "Active Hybrid"
    },
    userReviews: MOCK_REVIEWS
  },
  {
    id: 2,
    name: "Minimalist Cotton Tee",
    price: 34.50,
    category: "Fashion",
    rating: 4.5,
    reviews: 89,
    image: "https://picsum.photos/600/600?random=2",
    description: "Ethically sourced, 100% organic cotton. A staple for any wardrobe with a relaxed fit.",
    isOnSale: true,
    specs: {
      "Material": "100% Organic Cotton",
      "Fit": "Relaxed",
      "Care": "Machine Wash Cold"
    },
    userReviews: [MOCK_REVIEWS[0], MOCK_REVIEWS[2]]
  },
  {
    id: 3,
    name: "Urban Explorer Backpack",
    price: 129.00,
    category: "Accessories",
    rating: 4.9,
    reviews: 210,
    image: "https://picsum.photos/600/600?random=3",
    description: "Water-resistant, multiple compartments, and ergonomic design for the modern commuter.",
    specs: {
      "Capacity": "25L",
      "Material": "Water-resistant Nylon",
      "Laptop Compartment": "Up to 16 inches"
    },
    userReviews: MOCK_REVIEWS
  },
  {
    id: 4,
    name: "Smart Home Hub Gen 3",
    price: 149.99,
    category: "Electronics",
    rating: 4.2,
    reviews: 56,
    image: "https://picsum.photos/600/600?random=4",
    description: "Control your entire home with your voice. Compatible with over 5000 devices.",
    isNew: true,
    specs: {
      "Compatibility": "Zigbee, Z-Wave, WiFi",
      "Voice Assistant": "Montraa AI",
      "Power": "USB-C"
    },
    userReviews: [MOCK_REVIEWS[1]]
  },
  {
    id: 5,
    name: "Retro Mechanical Keyboard",
    price: 189.00,
    category: "Electronics",
    rating: 4.7,
    reviews: 342,
    image: "https://picsum.photos/600/600?random=5",
    description: "Clicky tactile switches with a vintage typewriter aesthetic. Bluetooth connectivity.",
    specs: {
      "Switches": "Blue Tactile",
      "Backlight": "White LED",
      "Battery": "4000mAh"
    },
    userReviews: MOCK_REVIEWS
  },
  {
    id: 6,
    name: "Silk Evening Dress",
    price: 250.00,
    category: "Fashion",
    rating: 4.6,
    reviews: 45,
    image: "https://picsum.photos/600/600?random=6",
    description: "Elegant silk dress perfect for formal occasions. Available in midnight blue and emerald.",
    specs: {
      "Material": "100% Mulberry Silk",
      "Length": "Maxi",
      "Care": "Dry Clean Only"
    },
    userReviews: [MOCK_REVIEWS[0], MOCK_REVIEWS[2]]
  }
];

export const CATEGORIES = ["All", "Electronics", "Fashion", "Accessories", "Home"];