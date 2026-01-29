import React, { useState } from 'react';
import { PageView } from '../types';
import { ArrowLeft, User, Lock, Mail } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (page: PageView) => void;
  onLogin: (name: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(name || "Пользователь");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black relative overflow-hidden px-4">
      {/* Dynamic Background */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLogin ? 'opacity-30' : 'opacity-50'}`}>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        <button 
          onClick={() => onNavigate(PageView.HOME)} 
          className="absolute -top-16 left-0 flex items-center text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Назад
        </button>

        {/* The Card */}
        <div className="bg-brand-paper/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
          
          {/* Toggle Switch */}
          <div className="flex bg-black/50 rounded-full p-1 mb-10 relative">
             <div 
               className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-brand-orange rounded-full transition-all duration-500 ease-out shadow-lg shadow-brand-orange/30`}
               style={{ left: isLogin ? '4px' : 'calc(50%)' }}
             ></div>
             <button 
               onClick={() => setIsLogin(true)}
               className={`flex-1 relative z-10 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isLogin ? 'text-white' : 'text-gray-400 hover:text-white'}`}
             >
               Вход
             </button>
             <button 
               onClick={() => setIsLogin(false)}
               className={`flex-1 relative z-10 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${!isLogin ? 'text-white' : 'text-gray-400 hover:text-white'}`}
             >
               Регистрация
             </button>
          </div>

          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
              {isLogin ? 'С Возвращением' : 'MCR Private Club'}
            </h2>
            <p className="text-gray-500 text-xs">
              {isLogin ? 'Введите свои данные для доступа' : 'Заполните анкету для вступления'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login Form / Register Form content swapper */}
             <div className="space-y-5 relative">
                {!isLogin && (
                   <div className="relative group animate-slide-down">
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-brand-orange transition-colors" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange transition-colors text-sm"
                      placeholder="Ваше Имя"
                    />
                  </div>
                )}

                <div className="relative group animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-brand-orange transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange transition-colors text-sm"
                    placeholder="Email адрес"
                  />
                </div>

                <div className="relative group animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-brand-orange transition-colors" />
                  <input 
                    type="password" 
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange transition-colors text-sm"
                    placeholder="Пароль"
                  />
                </div>
             </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300 mt-8 shadow-lg shadow-white/5 hover:shadow-brand-orange/40"
            >
              {isLoading ? 'Обработка...' : (isLogin ? 'Войти' : 'Создать аккаунт')}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <a href="#" className="text-xs text-gray-500 hover:text-brand-orange transition-colors">
              Забыли пароль?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};