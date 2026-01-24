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
    <div className="card-3d-parent h-full" onClick={handleQuickView}>
      <div className="card-3d group relative h-full bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-500 cursor-pointer flex flex-col isolate">
        
        {/* Top Badges - High Layer */}
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-2 pointer-events-none card-3d-layer-high transition-transform duration-500 group-hover:scale-110">
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

        {/* Wishlist Button - High Layer */}
        <button 
          onClick={handleWishlist}
          className={`absolute top-4 right-4 z-30 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 card-3d-layer-high ${
            isWishlisted 
            ? 'bg-white/90 text-red-500 shadow-sm scale-110' 
            : 'bg-black/20 text-white hover:bg-white hover:text-red-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Image Container - Mid Layer */}
        <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-slate-700 flex-shrink-0 card-3d-layer-mid transition-transform duration-500">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Centered Actions - High Layer */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 z-40 card-3d-layer-high">
            <button 
              onClick={handleQuickView}
              className="bg-white text-gray-900 px-5 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 hover:text-white hover:shadow-xl hover:shadow-orange-600/40 transform translate-y-4 group-hover:translate-y-0"
            >
              <span className="flex items-center gap-2">
                <Eye size={16} /> Details
              </span>
            </button>
            
            <button 
              onClick={handleAddToCart}
              className="bg-white text-gray-900 p-3 rounded-full transition-all duration-300 hover:bg-orange-600 hover:text-white hover:shadow-xl hover:shadow-orange-600/40 transform translate-y-4 group-hover:translate-y-0 delay-75"
              title="Add to Cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>

        {/* Content Section - Low to High Transition */}
        <div className="card-3d-content-box p-6 bg-white dark:bg-slate-800 transition-colors duration-500 group-hover:bg-orange-50/20 dark:group-hover:bg-slate-900/40 flex-1 flex flex-col">
          <div className="card-3d-layer-low transition-transform duration-500">
            <div className="flex items-center gap-1 mb-3">
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
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 ml-1">({product.reviews})</span>
            </div>
          </div>
          
          <h3 className="card-3d-layer-mid font-black text-xl text-gray-900 dark:text-white mb-2 truncate group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="card-3d-layer-low text-xs text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 flex-grow">
            {product.description}
          </p>
          
          <div className="card-3d-layer-high flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 transition-transform duration-500">
            <span className="text-2xl font-black text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-[10px] font-black px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 rounded-lg uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;