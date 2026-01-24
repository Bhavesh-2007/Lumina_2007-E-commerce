import React, { useState } from 'react';
import { CheckCircle, CreditCard, Truck, MapPin, Wallet, Smartphone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

type PaymentType = 'card' | 'paypal' | 'wallet';

const Checkout: React.FC = () => {
  const { cartTotal, clearCart, setView } = useStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>('card');

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
          <div key={idx} className={`flex flex-col items-center bg-transparent px-4 z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${step > idx + 1 ? 'bg-green-500 text-white' : step === idx + 1 ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              <s.icon size={18} />
            </div>
            <span className={`text-sm font-medium ${step === idx + 1 ? 'text-blue-600' : 'text-gray-500'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-white/5 min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6 animate-slide-in">
            <h2 className="text-2xl font-bold dark:text-white">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
              <input type="text" placeholder="Last Name" className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
            </div>
            <input type="text" placeholder="Address" className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
              <input type="text" placeholder="ZIP Code" className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
            </div>
            <button 
              onClick={handleNext} 
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex justify-center shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
            >
              {loading ? "Processing..." : "Continue to Payment"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold dark:text-white">Payment Method</h2>
              <span className="text-blue-500 font-bold">${cartTotal.toFixed(2)}</span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { id: 'card', icon: CreditCard, label: 'Card' },
                { id: 'paypal', icon: Wallet, label: 'PayPal' },
                { id: 'wallet', icon: Smartphone, label: 'Wallet' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentType(m.id as PaymentType)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${
                    paymentType === m.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-500'
                  }`}
                >
                  <m.icon size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider">{m.label}</span>
                </button>
              ))}
            </div>

            {paymentType === 'card' && (
              <div className="space-y-4 animate-slide-in">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Card Details</span>
                  <div className="flex gap-2 items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                    <img src="https://pentagram-production.imgix.net/de996aa4-5343-4200-a466-ab8fc7eafa80/am_amex_01.jpg?auto=compress%2Cformat&fit=min&fm=jpg&q=80&rect=0%2C172%2C3000%2C1875&w=880&fit=crop&fm=jpg&q=70&auto=format&h=548" alt="AMEX" className="h-4 rounded-sm mix-blend-multiply dark:mix-blend-normal dark:bg-white/90" />
                    <img src="https://brandlogos.net/wp-content/uploads/2021/11/discover_card-logo-512x512.png" alt="Discover" className="h-8 self-center mix-blend-multiply dark:mix-blend-normal dark:bg-white/90 rounded-sm transition-transform hover:scale-110" />
                  </div>
                </div>
                <input type="text" placeholder="Card Number" className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
                  <input type="text" placeholder="CVC" className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
                </div>
              </div>
            )}

            {paymentType === 'paypal' && (
              <div className="p-10 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 animate-slide-in">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-10" />
                 <p className="text-gray-500 text-sm">You will be redirected to PayPal to complete your purchase safely.</p>
              </div>
            )}

            {paymentType === 'wallet' && (
              <div className="space-y-4 animate-slide-in">
                 <button className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-6 invert" />
                   Pay with Apple Pay
                 </button>
                 <button className="w-full py-4 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg" alt="Google Pay" className="h-6" />
                   Pay with G-Pay
                 </button>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
               <button 
                onClick={handleNext} 
                disabled={loading}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex justify-center shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
              >
                {loading ? "Processing..." : `Complete Purchase - $${cartTotal.toFixed(2)}`}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 animate-slide-in">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-extrabold dark:text-white mb-2 tracking-tight">Success!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">Your order has been placed. We've sent a confirmation email to your inbox.</p>
            <button 
              onClick={handleFinish} 
              disabled={loading}
              className="px-10 py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full font-bold hover:opacity-90 transition-all shadow-xl hover:scale-105"
            >
              Return to Store
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-gray-400 text-xs mt-8 uppercase tracking-[0.2em] font-medium">Secure End-to-End Encryption</p>
    </div>
  );
};

export default Checkout;