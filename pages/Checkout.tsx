import React, { useState } from 'react';
import { CheckCircle, CreditCard, Truck, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Checkout: React.FC = () => {
  const { cartTotal, clearCart, setView } = useStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step < 3) setStep(step + 1);
    }, 1000);
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      setView('home');
      alert('Order Placed Successfully! (Simulation)');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Steps Indicator */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 -translate-y-1/2"></div>
        {[
          { icon: MapPin, label: "Shipping" },
          { icon: CreditCard, label: "Payment" },
          { icon: CheckCircle, label: "Confirmation" }
        ].map((s, idx) => (
          <div key={idx} className={`flex flex-col items-center bg-gray-50 dark:bg-slate-950 px-4 z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${step > idx + 1 ? 'bg-green-500 text-white' : step === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              <s.icon size={18} />
            </div>
            <span className={`text-sm font-medium ${step === idx + 1 ? 'text-blue-600' : 'text-gray-500'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6 animate-slide-in">
            <h2 className="text-2xl font-bold dark:text-white">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg w-full" />
              <input type="text" placeholder="Last Name" className="p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg w-full" />
            </div>
            <input type="text" placeholder="Address" className="p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg w-full" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" className="p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg w-full" />
              <input type="text" placeholder="ZIP Code" className="p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg w-full" />
            </div>
            <button 
              onClick={handleNext} 
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex justify-center"
            >
              {loading ? "Processing..." : "Continue to Payment"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-slide-in">
            <h2 className="text-2xl font-bold dark:text-white">Payment Details</h2>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-lg text-blue-800 dark:text-blue-300 text-sm mb-4">
              Secure SSL Encrypted Connection
            </div>
            <input type="text" placeholder="Card Number" className="p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg w-full" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="MM/YY" className="p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg w-full" />
              <input type="text" placeholder="CVC" className="p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg w-full" />
            </div>
            <div className="flex justify-between font-bold text-lg dark:text-white pt-4">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleNext} 
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex justify-center"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 animate-slide-in">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-bold dark:text-white mb-2">Success!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Your order has been placed successfully.</p>
            <button 
              onClick={handleFinish} 
              disabled={loading}
              className="px-8 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
