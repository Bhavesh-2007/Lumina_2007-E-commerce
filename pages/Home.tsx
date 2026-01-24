import React, { useState, useMemo } from 'react';
import { ArrowRight, Truck, Shield, Clock, Star, Quote, PlayCircle, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { setView } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return MOCK_PRODUCTS.slice(0, 3);
    }
    return MOCK_PRODUCTS.filter(p => p.category === selectedCategory).slice(0, 3);
  }, [selectedCategory]);

  const lifestyleImages = [
    "https://i.pinimg.com/736x/aa/30/37/aa3037cb7e93bf26a0cd141072c2941a.jpg",
    "https://i.pinimg.com/736x/59/4c/92/594c927d6bb99e7fec0458bbdd00baba.jpg",
    "https://i.pinimg.com/736x/de/61/5e/de615e8da87828121a92e12453c03e98.jpg",
    "https://i.pinimg.com/736x/f0/b0/c2/f0b0c29c6773362f4c47fd2e7ead127c.jpg",
    "https://i.pinimg.com/736x/72/6c/1d/726c1d9f7cd66522977c8dfc36906f34.jpg"
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section with Cinematic Brand Video */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          {/* SnapCart Cinematic Brand Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-1000"
            poster="https://i.ibb.co/7bC9B2B/poster.jpg"
          >
            {/* Using a high-quality video that matches the unboxing/product-reveal style from the prompt */}
            <source src="https://v.ftcdn.net/05/57/34/06/700_F_557340632_79iH7O6X0vD8mC9Xz7WjP8C8nLpB0L4j_ST.mp4" type="video/mp4" />
          </video>
          
          {/* Subtle Studio Lighting Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/10 border border-orange-600/20 backdrop-blur-md mb-8 animate-slide-in">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
                <span className="text-sm font-bold text-orange-600">Premium Brand Reveal</span>
            </div>

             <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-gray-900 mb-6 leading-none animate-slide-in">
                Unbox the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">Extraordinary</span>
              </h1>
              
              <p className="mt-4 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 font-medium animate-slide-in" style={{ animationDelay: '0.1s' }}>
                Join the SnapCart revolution. Experience curated excellence delivered with precision.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <button 
                  onClick={() => setView('shop')}
                  className="px-12 py-5 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-full shadow-2xl shadow-orange-600/40 transition-all hover:scale-110 flex items-center justify-center gap-3 group"
                >
                  Shop the Collection <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
                  className="px-12 py-5 bg-gray-900 text-white font-bold rounded-full shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  <PlayCircle size={22} /> Watch Intro
                </button>
              </div>
        </div>
      </section>

      {/* Brand Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Snap Delivery", desc: "Our signature high-speed logistics network." },
            { icon: Shield, title: "Vault Security", desc: "Every transaction protected by SnapGuard." },
            { icon: Clock, title: "Elite Support", desc: "24/7 access to our premium concierge team." }
          ].map((feature, idx) => (
            <div key={idx} className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-orange-500/10 transition-all hover:-translate-y-3 flex flex-col items-center text-center group cursor-default">
              <div className="p-5 bg-orange-50 dark:bg-orange-900/20 rounded-3xl text-orange-600 dark:text-orange-400 mb-6 group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-500">
                <feature.icon size={36} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Drops */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="w-full md:w-auto">
            <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tight">Today's Drops</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 mb-10 text-xl font-light">Exclusive access to SnapCart's most wanted items</p>
            <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 rounded-full text-base font-bold transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-orange-600 text-white shadow-xl shadow-orange-500/40 scale-105'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-orange-500 hover:text-orange-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setView('shop')} className="text-orange-600 hover:text-orange-700 font-black text-lg flex items-center gap-2 group whitespace-nowrap mb-6 md:mb-0 transition-all">
            Explore All Drops <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[400px]">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Aesthetic Lifestyle Gallery - NEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} /> The SnapCart Aesthetic
          </div>
          <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4">The Aesthetic Edge</h2>
          <p className="text-gray-500 dark:text-gray-400 text-xl font-light max-w-2xl mx-auto">Crafted for those who define the trend. Our brand vision extends beyond products into a lifestyle of curated excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          {/* Main Large Image */}
          <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img 
              src={lifestyleImages[0]} 
              alt="SnapCart Lifestyle 1" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
              <span className="text-white text-2xl font-black italic tracking-tighter">Precision Audio.</span>
            </div>
          </div>

          {/* Top Right */}
          <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] shadow-xl">
            <img 
              src={lifestyleImages[1]} 
              alt="SnapCart Lifestyle 2" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bottom Row - 3 small images */}
          <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] shadow-xl">
            <img 
              src={lifestyleImages[2]} 
              alt="SnapCart Lifestyle 3" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Second row of bento boxes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 h-auto md:h-[400px]">
          <div className="md:col-span-6 relative group overflow-hidden rounded-[2.5rem] shadow-xl">
             <img 
              src={lifestyleImages[3]} 
              alt="SnapCart Lifestyle 4" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="md:col-span-6 relative group overflow-hidden rounded-[2.5rem] shadow-xl">
             <img 
              src={lifestyleImages[4]} 
              alt="SnapCart Lifestyle 5" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Secure Infrastructure Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50 dark:bg-slate-900/30 rounded-[3rem]">
        <div className="flex flex-col items-center justify-center text-center space-y-12">
          <h3 className="text-sm font-black uppercase tracking-[0.5em] text-orange-600/60">Certified Global Payments</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 dark:opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 md:h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-10 md:h-12" />
            <img src="https://pentagram-production.imgix.net/de996aa4-5343-4200-a466-ab8fc7eafa80/am_amex_01.jpg?auto=compress%2Cformat&fit=min&fm=jpg&q=80&rect=0%2C172%2C3000%2C1875&w=880&fit=crop&fm=jpg&q=70&auto=format&h=548" alt="AMEX" className="h-10 md:h-12 dark:invert" />
            <img src="https://brandlogos.net/wp-content/uploads/2021/11/discover_card-logo-512x512.png" alt="Discover" className="h-16 md:h-24" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8 md:h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-8 md:h-10 dark:invert" />
          </div>
        </div>
      </section>

      {/* Community Voice */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-6">The SnapCart Standard</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xl font-light">Why over 100k customers choose SnapCart Shop.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                text: "SnapCart isn't just a store, it's an experience. The brand video promised quality, and the product delivered more.",
                author: "Sarah Johnson",
                role: "Founding Member",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                text: "The unboxing experience is what sets them apart. Clean, premium, and sustainable packaging. Simply the best.",
                author: "Michael Chen",
                role: "Verified Curator",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                text: "I trust SnapCart for all my high-end electronics. Their vault security gives me total peace of mind.",
                author: "Jessica Williams",
                role: "Tech Lead",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-12 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 relative hover:-translate-y-4 transition-all duration-500 group">
                <Quote className="absolute top-12 right-12 text-orange-600/10 group-hover:text-orange-600/20 transition-colors" size={64} />
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-10 italic text-xl leading-relaxed relative z-10">"{testimonial.text}"</p>
                <div className="flex items-center gap-5 pt-8 border-t border-gray-100 dark:border-gray-700">
                  <img src={testimonial.image} alt={testimonial.author} className="w-16 h-16 rounded-full object-cover ring-4 ring-orange-500/20 shadow-xl" />
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white text-xl">{testimonial.author}</h4>
                    <span className="text-sm text-orange-600 font-black uppercase tracking-widest">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-[4rem] overflow-hidden bg-gray-900 py-32 px-8 md:px-20 text-center shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Ready for the <br/><span className="text-orange-500">Extraordinary?</span></h2>
            <p className="text-gray-400 mb-16 max-w-2xl mx-auto text-2xl font-light">Secure your spot in our next drop and never settle for ordinary again.</p>
            <div className="flex flex-col sm:flex-row gap-6 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 backdrop-blur-xl transition-all text-xl"
              />
              <button className="px-12 py-5 bg-orange-600 text-white font-black rounded-full hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/40 transform hover:-translate-y-2 text-xl">
                Join SnapCart
              </button>
            </div>
          </div>
          {/* Brand Glow Effects */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-orange-600/30 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-amber-600/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
      </section>
    </div>
  );
};

export default Home;