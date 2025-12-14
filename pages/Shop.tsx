import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'newest';

const Shop: React.FC = () => {
  const { searchQuery, setSearchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter(product => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
      const priceMatch = product.price <= priceRange;
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Relevance keeps default order
        break;
    }

    return result;
  }, [selectedCategory, priceRange, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {searchQuery ? `Search results for "${searchQuery}"` : "Shop All"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Showing {filteredProducts.length} results</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-gray-900 dark:text-white"
          >
            <SlidersHorizontal size={18} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Filter size={18} /> Categories
            </h3>
            <div className="space-y-2">
              {CATEGORIES.map(category => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedCategory === category ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                    {selectedCategory === category && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                  <input 
                    type="radio" 
                    name="category" 
                    className="hidden" 
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <span className={`text-sm group-hover:text-blue-500 transition-colors ${selectedCategory === category ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Price Range</h3>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>$0</span>
              <span>${priceRange}</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">No products found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
              <button onClick={() => {setSearchQuery(''); setPriceRange(1000); setSelectedCategory('All');}} className="mt-4 text-blue-600 hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;