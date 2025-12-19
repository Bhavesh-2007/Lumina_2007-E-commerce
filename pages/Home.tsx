import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Truck, Shield, Clock, Star, Quote, Play } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';

const HERO_FRAMES = [
  "https://i.pinimg.com/736x/7b/c9/b2/7bc9b2b1aad479631309ee864715878e.jpg",
  "https://i.pinimg.com/736x/d1/d2/5d/d1d25d706774f4062ed4e77a8bad2c17.jpg",
  "https://i.pinimg.com/736x/bc/6b/0c/bc6b0ceb233e125ef3eae3a2da57f8bf.jpg",
  "https://i.pinimg.com/1200x/8e/75/ba/8e75bab978067dfd257547ad0e9b8de2.jpg"
];

const Home: React.FC = () => {
  const { setView } = useStore();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return MOCK_PRODUCTS.slice(0, 3);
    }
    return MOCK_PRODUCTS.filter(p => p.category === selectedCategory).slice(0, 3);
  }, [selectedCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % HERO_FRAMES.length);
    }, 4000); // Cycle every 4 seconds for a smooth slideshow effect
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section - Slideshow Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          {HERO_FRAMES.map((src, index) => (
             <img
                key={src}
                src={src}
                alt={`Hero slide ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentFrame ? 'opacity-60' : 'opacity-0'
                }`}
             />
          ))}
          {/* Overlay Gradients for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-gray-900/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-white">New Collection Dropped</span>
            </div>

             <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-2xl">
                Unbox the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Extraordinary</span>
              </h1>
              
              <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 drop-shadow-lg font-light">
                Discover a world of premium tech, fashion, and lifestyle essentials. Curated for those who demand the best.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setView('shop')}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-sm group"
                >
                  Start Shopping <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold rounded-full shadow-lg transition-all hover:scale-105 backdrop-blur-md"
                >
                  Learn More
                </button>
              </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On all orders over $50" },
            { icon: Shield, title: "Secure Payment", desc: "100% secure payment gateways" },
            { icon: Clock, title: "24/7 Support", desc: "Dedicated support anytime" }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col items-center text-center group cursor-default">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <feature.icon size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div className="w-full md:w-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">Top picks for this week</p>
            
            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <button onClick={() => setView('shop')} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group whitespace-nowrap mb-2 md:mb-0">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
             <div className="col-span-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
               <p className="text-gray-500 dark:text-gray-400 font-medium">No trending items in {selectedCategory} at the moment.</p>
               <button onClick={() => setSelectedCategory('All')} className="mt-2 text-blue-600 text-sm hover:underline">View All Categories</button>
             </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-slate-900 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#6b7280 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Loved by Thousands</h2>
            <p className="text-gray-500 dark:text-gray-400">Don't just take our word for it. Here's what our community has to say.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The quality of the products is unmatched. I've bought headphones and clothes, and both were perfect.",
                author: "Sarah Johnson",
                role: "Verified Buyer",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                text: "Customer service was incredibly helpful when I needed to exchange a size. Highly recommended!",
                author: "Michael Chen",
                role: "Tech Enthusiast",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                text: "Montraa has completely changed how I shop online. The AI assistant actually gives good advice.",
                author: "Jessica Williams",
                role: "Fashion Blogger",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative hover:-translate-y-1 transition-transform duration-300">
                <Quote className="absolute top-8 right-8 text-blue-100 dark:text-slate-700" size={40} />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic relative z-10">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
                    <span className="text-xs text-blue-500 font-medium uppercase tracking-wide">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 py-16 px-8 md:px-16 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Subscribe to our newsletter for exclusive offers, early access to new drops, and design inspiration.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all"
              />
              <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;