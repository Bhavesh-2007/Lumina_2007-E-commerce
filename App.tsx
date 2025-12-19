import React, { useState } from 'react';
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

const AppContent: React.FC = () => {
  const { view } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderView = () => {
    switch (view) {
      case 'home': return <Home />;
      case 'shop': return <Shop />;
      case 'product-details': return <ProductDetails />;
      case 'admin': return <AdminDashboard />;
      case 'checkout': return <Checkout />;
      case 'profile': return <Profile />;
      case 'create-shop': return <CreateShop />;
      case 'login': return <Login />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo className="w-8 h-8" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Montraa</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Redefining the shopping experience with AI and modern design.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>Electronics</li>
                <li>Fashion</li>
                <li>Accessories</li>
                <li>New Arrivals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Returns</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            © 2024 Montraa Store. All rights reserved.
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