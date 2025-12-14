import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

type Tab = 'description' | 'specs' | 'reviews';

const ProductDetails: React.FC = () => {
  const { selectedProduct, addToCart, setView, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [activeTab, setActiveTab] = useState<Tab>('description');

  if (!selectedProduct) return null;

  const isWishlisted = isInWishlist(selectedProduct.id);

  // Mock data for variation
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Black', class: 'bg-gray-900' },
    { name: 'Blue', class: 'bg-blue-600' },
    { name: 'White', class: 'bg-gray-100' }
  ];

  // Get Related Products (Mock logic: same category or random)
  const relatedProducts = MOCK_PRODUCTS.filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category).slice(0, 3);
  // Fallback if not enough category matches
  const displayRelated = relatedProducts.length > 0 ? relatedProducts : MOCK_PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slide-in">
      <button 
        onClick={() => setView('shop')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-8"
      >
        <ArrowLeft size={20} /> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 relative group cursor-zoom-in">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 origin-center"
            />
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
              Hover to Zoom
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-blue-500 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <img src={selectedProduct.image} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase">
                {selectedProduct.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">{selectedProduct.name}</h1>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${selectedProduct.price}</p>
          </div>

          {/* Short Description */}
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {selectedProduct.description}
          </p>

          <div className="space-y-6 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Select Color: <span className="font-normal text-gray-500">{selectedColor}</span></label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color.name ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-110'}`}
                  >
                    <div className={`w-8 h-8 rounded-full border border-gray-200 ${color.class}`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Select Size: <span className="font-normal text-gray-500">{selectedSize}</span></label>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border font-medium transition-all ${
                      selectedSize === size 
                      ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-slate-800">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600"
              >
                -
              </button>
              <span className="w-8 text-center font-medium dark:text-white">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full py-3 px-8 transition-all hover:shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            
            <button 
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`p-3 border rounded-full transition-all ${
                isWishlisted 
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 text-red-500' 
                : 'border-gray-300 dark:border-gray-700 text-gray-600 hover:text-red-500 hover:border-red-500 bg-white dark:bg-slate-800'
              }`}
            >
              <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 pt-4">
            <div className="flex flex-col items-center gap-2 text-center p-3 rounded-xl bg-gray-50 dark:bg-slate-900">
              <Truck size={20} className="text-blue-500" /> 
              <span>Free Shipping Over $50</span>
            </div>
             <div className="flex flex-col items-center gap-2 text-center p-3 rounded-xl bg-gray-50 dark:bg-slate-900">
              <ShieldCheck size={20} className="text-blue-500" /> 
              <span>2 Year Warranty</span>
            </div>
             <div className="flex flex-col items-center gap-2 text-center p-3 rounded-xl bg-gray-50 dark:bg-slate-900">
              <RefreshCw size={20} className="text-blue-500" /> 
              <span>30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-16">
        <div className="flex border-b border-gray-100 dark:border-gray-700">
           {(['description', 'specs', 'reviews'] as Tab[]).map((tab) => (
             <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${
                activeTab === tab 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
             >
               {tab}
             </button>
           ))}
        </div>
        
        <div className="p-8 min-h-[300px]">
          {activeTab === 'description' && (
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold mb-4">Product Story</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Designed for modern life, this product combines aesthetics with functionality. Every detail has been crafted to provide the best user experience possible. Whether you're using it at home, in the office, or on the go, it stands up to the task.
              </p>
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Premium eco-friendly materials</li>
                <li>Ergonomic design for comfort</li>
                <li>Durable construction built to last</li>
                <li>Minimalist aesthetic that fits anywhere</li>
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {selectedProduct.specs ? (
                Object.entries(selectedProduct.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-500 dark:text-gray-400">{key}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
                  </div>
                ))
              ) : (
                <p>No specific specifications available for this product.</p>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {selectedProduct.userReviews && selectedProduct.userReviews.length > 0 ? (
                selectedProduct.userReviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 flex items-center justify-center font-bold text-xs">
                           {review.user.charAt(0)}
                         </div>
                         <span className="font-bold text-gray-900 dark:text-white">{review.user}</span>
                       </div>
                       <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayRelated.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;