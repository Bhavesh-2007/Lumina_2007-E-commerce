import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import AIChatbot from './components/AIChatbot';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import CreateShop from './pages/CreateShop';
import Login from './pages/Login';
import { Logo } from './components/Logo';

const IntroAnimation: React.FC<{ isExiting: boolean }> = ({ isExiting }) => {
  return (
    <div id="intro-container" className={isExiting ? 'fade-out' : ''}>
      <snapcart-intro letter="S">
        <div className="intro-letter-s">
          <div className="helper-1"><div className="effect-brush"></div></div>
          <div className="helper-2"><div className="effect-brush"></div></div>
          <div className="helper-3"><div className="effect-brush"></div></div>
          <div className="helper-4"><div className="effect-brush"></div></div>
          <div className="helper-5"><div className="effect-brush"></div></div>
          
          <div className="effect-lumieres">
            <span className="lamp-1"></span>
            <span className="lamp-2"></span>
          </div>
        </div>
      </snapcart-intro>

      {/* Speeder Loader positioned above text */}
      <div className="loader-container">
        <div className="loader">
          <span><span></span><span></span><span></span><span></span></span>
          <div className="base">
            <span></span>
            <div className="face"></div>
          </div>
        </div>
        <div className="longfazers">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>

      <div id="intro-logo-text" className="font-black">SnapCart</div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { view, setView } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introExiting, setIntroExiting] = useState(false);

  useEffect(() => {
    // Cinematic intro timing
    const exitTimer = setTimeout(() => {
      setIntroExiting(true);
    }, 4500);

    const cleanupTimer = setTimeout(() => {
      setShowIntro(false);
    }, 5500); 

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  const renderView = () => {
    switch (view) {
      case 'home': return <Home />;
      case 'shop': return <Shop />;
      case 'product-details': return <ProductDetails />;
      case 'admin': return <AdminDashboard />;
      case 'checkout': return <Checkout />;
      case 'profile': return <Profile />;
      case 'create-shop': return <CreateShop />;
      case 'login': return <Login initialMode="login" />;
      case 'signup': return <Login initialMode="signup" />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-500 relative isolate">
      {showIntro && <IntroAnimation isExiting={introExiting} />}
      
      {/* Dynamic Cinematic Background Layer */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none select-none">
        <img 
          src="https://i.pinimg.com/736x/7c/88/56/7c8856e15121993790413dcfb670e1b4.jpg" 
          alt="Atmospheric Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-20 transition-opacity duration-1000 animate-ken-burns scale-110"
        />
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/70 backdrop-blur-[6px]"></div>
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 dark:bg-orange-600/5 rounded-full blur-[140px] animate-float"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[140px] animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-amber-500/10 dark:bg-amber-600/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.4)_100%)]"></div>
      </div>

      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow relative z-10">
        {renderView()}
      </main>

      <footer className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-t border-gray-200 dark:border-gray-800 py-12 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo className="w-10 h-10" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">SnapCart</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Redefining the shopping experience with SnapCart's intuitive brand and modern design.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setView('shop')}>Electronics</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setView('shop')}>Fashion</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setView('shop')}>Accessories</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setView('shop')}>New Arrivals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="hover:text-orange-500 cursor-pointer transition-colors">About SnapCart</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Sellers</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Press</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Returns</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            © 2024 SnapCart Shop. All rights reserved.
          </div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AIChatbot />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;