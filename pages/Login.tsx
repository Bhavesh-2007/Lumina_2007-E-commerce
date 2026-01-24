import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles, User, Github, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/Logo';

interface LoginProps {
  initialMode?: 'login' | 'signup';
}

const Login: React.FC<LoginProps> = ({ initialMode = 'login' }) => {
  const { login, setView } = useStore();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate premium authentication delay
    setTimeout(() => {
      login();
      setIsLoading(false);
      setView('profile');
    }, 1200);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 px-4">
      
      {/* Cinematic Background with Premium Lifestyle Imagery */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.pinimg.com/736x/aa/30/37/aa3037cb7e93bf26a0cd141072c2941a.jpg"
          alt="Premium Aesthetic Background"
          className="w-full h-full object-cover scale-105 animate-ken-burns opacity-60 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/80 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-purple-500/10"></div>
      </div>

      {/* Auth Container */}
      <div className="relative z-10 w-full max-w-xl animate-slide-in">
        <div className="glass-panel p-8 md:p-12 rounded-[3rem] shadow-[0_32px_64px_rgba(0,0,0,0.1)] border border-white/40 dark:border-white/5 relative overflow-hidden transition-all duration-700">
          
          {/* Subtle Glow FX */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-white dark:bg-slate-800 rounded-[1.5rem] mb-6 shadow-2xl border border-gray-100 dark:border-gray-700 transform transition-transform hover:scale-110">
              <Logo className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter">
              {isLogin ? 'Welcome Back' : 'Join the Elite'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-light">
              {isLogin 
                ? 'Your extraordinary collection awaits.' 
                : 'Experience the future of premium shopping.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
               <div className="group animate-slide-in">
                <label className="block text-xs font-black text-gray-400 dark:text-gray-500 mb-2 ml-1 uppercase tracking-[0.2em]">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    required
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
              </div>
            )}

            <div className="group">
              <label className="block text-xs font-black text-gray-400 dark:text-gray-500 mb-2 ml-1 uppercase tracking-[0.2em]">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@snapcart.shop"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-black text-gray-400 dark:text-gray-500 mb-2 ml-1 uppercase tracking-[0.2em]">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                  Forgot Access Key?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl shadow-2xl hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-3 border-gray-500 border-t-orange-500 rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In to SnapCart' : 'Create My Account'} 
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Auth */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-6 text-gray-400 dark:text-gray-500 bg-white dark:bg-slate-800 font-black uppercase tracking-[0.3em] rounded-full">Secure Gateway</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-gray-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-700 dark:text-gray-300 font-bold transition-all hover:shadow-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-gray-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-700 dark:text-gray-300 font-bold transition-all hover:shadow-lg">
              <Github size={20} />
              GitHub
            </button>
          </div>

          {/* Footer Toggle */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              {isLogin ? "Not part of the collection?" : "Already an elite member?"}
              <button 
                onClick={toggleMode}
                className="ml-2 font-black text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-widest text-sm"
              >
                {isLogin ? "Register Now" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
        
        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-[0.4em] drop-shadow-md">
          <ShieldCheck size={16} className="text-orange-600" />
          SnapCart Encrypted Authentication
        </div>
      </div>
    </div>
  );
};

export default Login;