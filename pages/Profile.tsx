import React, { useState } from 'react';
import { Package, Heart, LogOut, User as UserIcon, Calendar, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';

const Profile: React.FC = () => {
  const { user, logout, setView } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <UserIcon size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Please Log In</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
          Access your order history, manage your wishlist, and update your profile by logging into your account.
        </p>
        <button 
          onClick={() => { setView('login'); }} 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors shadow-lg"
        >
          Log In / Sign Up
        </button>
      </div>
    );
  }

  // Hydrate wishlist items from IDs
  const wishlistItems = MOCK_PRODUCTS.filter(p => user.wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slide-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-50 dark:border-blue-900/20 object-cover" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>
            <button 
              onClick={logout}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-red-200 dark:border-red-900/30 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-4 text-left transition-colors ${activeTab === 'orders' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-l-4 border-blue-500' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
            >
              <div className="flex items-center gap-3">
                <Package size={20} />
                <span className="font-medium">Order History</span>
              </div>
              <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center justify-between p-4 text-left transition-colors ${activeTab === 'wishlist' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-l-4 border-blue-500' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
            >
              <div className="flex items-center gap-3">
                <Heart size={20} />
                <span className="font-medium">Wishlist</span>
              </div>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
              {user.orders.map(order => (
                <div key={order.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="block text-gray-500 dark:text-gray-400">Order Placed</span>
                        <span className="font-medium text-gray-900 dark:text-white">{order.date}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 dark:text-gray-400">Total</span>
                        <span className="font-medium text-gray-900 dark:text-white">${order.total.toFixed(2)}</span>
                      </div>
                       <div>
                        <span className="block text-gray-500 dark:text-gray-400">Order #</span>
                        <span className="font-medium text-gray-900 dark:text-white">{order.id}</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      {order.status}
                    </div>
                  </div>
                  <div className="p-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                           <button onClick={() => setView('shop')} className="text-sm text-blue-600 hover:underline">Buy Again</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Wishlist</h3>
              {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                  <Heart size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Your wishlist is empty</p>
                  <button onClick={() => setView('shop')} className="text-blue-600 font-medium hover:underline">Start Shopping</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;