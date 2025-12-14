import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, setView } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-slide-in">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShoppingBag size={20} />
              Your Cart
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400">
                  <ShoppingBag size={32} />
                </div>
                <p className="text-gray-500 font-medium">Your cart is empty</p>
                <button 
                  onClick={onClose}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">${item.price}</p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-slate-800/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => { onClose(); setView('checkout'); }}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
              >
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
