import React, { useState } from 'react';
import { Upload, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/Logo';

const CreateShop: React.FC = () => {
  const { setView } = useStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [shopName, setShopName] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center">
      
      {/* Background with provided image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.pinimg.com/1200x/a2/f3/d8/a2f3d8a11169839c1651652b4c8429c5.jpg" 
          alt="Abstract Background" 
          className="w-full h-full object-cover"
        />
        {/* Overlay for readability and premium glass effect */}
        <div className="absolute inset-0 bg-white/30 dark:bg-black/40 backdrop-blur-xl transition-colors duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50 dark:from-slate-950 dark:via-transparent dark:to-slate-900/50"></div>
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="glass-panel p-8 md:p-12 rounded-3xl shadow-2xl border border-white/40 dark:border-white/10 relative overflow-hidden">
          
          {/* Decor element */}
          <div className="absolute top-0 right-0 p-4 opacity-50">
             <Sparkles className="text-blue-500" size={40} />
          </div>

          {step === 1 ? (
            <div className="space-y-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                   <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl backdrop-blur-md shadow-xl border border-white/20">
                     <Logo className="w-16 h-16 drop-shadow-md" />
                   </div>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                  Launch Your Brand
                </h1>
                <p className="text-gray-600 dark:text-gray-200">
                  Join thousands of sellers on Montraa. Setup takes less than 2 minutes.
                </p>
              </div>

              <form onSubmit={handleCreate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Shop Name</label>
                  <input 
                    type="text" 
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="e.g. Neon Horizon"
                    className="w-full px-5 py-4 bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Category</label>
                   <select className="w-full px-5 py-4 bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white cursor-pointer appearance-none">
                     <option>Fashion & Apparel</option>
                     <option>Electronics & Gadgets</option>
                     <option>Home & Living</option>
                     <option>Art & Collectibles</option>
                   </select>
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <Upload className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" size={24} />
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Upload Shop Logo</span>
                  <span className="text-xs text-gray-400 mt-1">(Optional)</span>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>Processing...</>
                  ) : (
                    <>Create My Shop <ArrowRight size={20} /></>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500" size={48} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome, {shopName}!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-xs mx-auto">
                Your shop has been successfully created. You can now start adding products and managing orders.
              </p>
              <div className="pt-4 flex flex-col gap-3">
                 <button 
                  onClick={() => setView('admin')}
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Seller Dashboard
                </button>
                <button 
                  onClick={() => setView('home')}
                  className="w-full py-3 bg-transparent text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Return Home
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom text */}
        <p className="text-center text-white/80 dark:text-white/40 mt-6 text-sm font-medium drop-shadow-md">
          Powered by Montraa Commerce Engine
        </p>
      </div>
    </div>
  );
};

export default CreateShop;