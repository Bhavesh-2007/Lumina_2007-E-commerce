import React from 'react';
import { ShoppingCart, Eye, Star, Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, setView, toggleWishlist, isInWishlist } = useStore();

  const isWishlisted = isInWishlist(product.id);

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setView('product-details');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 cursor-pointer isolate h-full flex flex-col"
      onClick={handleQuickView}
    >
      
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
        {product.isNew && (
          <span className="px-3 py-1 text-[10px] font-bold text-white bg-blue-600 rounded-full uppercase tracking-wider shadow-lg shadow-blue-500/30">
            New
          </span>
        )}
        {product.isOnSale && (
          <span className="px-3 py-1 text-[10px] font-bold text-white bg-red-500 rounded-full uppercase tracking-wider shadow-lg shadow-red-500/30">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleWishlist}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
          isWishlisted 
          ? 'bg-white/90 text-red-500 shadow-sm' 
          : 'bg-black/20 text-white hover:bg-white hover:text-red-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0'
        }`}
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-slate-700 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
        />
        
        {/* Modern Blur Overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Action Buttons - Centered */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button 
            onClick={handleQuickView}
            className="group/btn relative overflow-hidden bg-white text-gray-900 px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/30 transform translate-y-4 group-hover:translate-y-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Eye size={16} /> Quick View
            </span>
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="group/btn relative overflow-hidden bg-white text-gray-900 p-3 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/30 transform translate-y-4 group-hover:translate-y-0 delay-75"
            title="Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative bg-white dark:bg-slate-800 transition-colors duration-300 group-hover:bg-gray-50/50 dark:group-hover:bg-slate-800/50 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                className={i < Math.floor(product.rating) ? "" : "text-gray-300 dark:text-gray-600"} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50 dark:border-gray-700/50">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-lg uppercase tracking-wide group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;