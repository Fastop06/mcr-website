import React, { useState } from 'react';
import { CartItem, PageView } from '../types';
import { Trash2, ArrowRight } from 'lucide-react';

interface CartPageProps {
  items: CartItem[];
  onRemove: (id: number, size: string) => void;
  onNavigate: (page: PageView) => void;
  onClearCart: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ items, onRemove, onNavigate, onClearCart }) => {
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'success'>('idle');
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setPaymentStep('processing');
    
    // Simulate payment process with unified timing (same as ProductPage)
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        onClearCart();
        setPaymentStep('idle');
        onNavigate(PageView.HOME);
      }, 4000); 
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-brand-black px-6 lg:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-white mb-16 uppercase tracking-tighter border-b border-white/10 pb-8 animate-slide-up">
           Корзина <span className="text-brand-orange align-top text-xl ml-2">({items.length})</span>
        </h2>

        {items.length === 0 ? (
          <div className="text-center py-40 animate-fade-in">
            <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-10">Ваша корзина пуста</p>
            <button 
              onClick={() => onNavigate(PageView.SHOP)}
              className="px-12 py-5 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Перейти к покупкам
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-8 bg-white/5 p-6 border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="w-32 aspect-[3/4] bg-brand-paper flex-shrink-0 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" onError={(e) => e.currentTarget.src = 'https://dummyimage.com/600x800/111/333&text=No+Image'} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-bold uppercase tracking-wider text-sm">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id, item.selectedSize)}
                          className="text-gray-600 hover:text-brand-orange transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-brand-orange text-[10px] font-bold uppercase tracking-widest mt-2">{item.category}</p>
                      <div className="mt-6 flex gap-6 text-xs text-gray-400 font-mono">
                        <p>Размер: <span className="text-white">{item.selectedSize}</span></p>
                        <p>Кол-во: <span className="text-white">{item.quantity}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-white font-mono text-lg">{item.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-brand-paper p-10 sticky top-28 border border-white/5 shadow-2xl">
                <h3 className="text-white font-bold uppercase mb-10 tracking-[0.2em] text-sm">Сумма Заказа</h3>
                
                <div className="space-y-6 mb-10 border-b border-white/5 pb-10">
                  <div className="flex justify-between text-gray-500 text-xs uppercase tracking-wider">
                    <span>Подытог</span>
                    <span className="font-mono">{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-xs uppercase tracking-wider">
                    <span>Доставка</span>
                    <span>Рассчитывается далее</span>
                  </div>
                </div>

                <div className="flex justify-between text-white font-black text-xl mb-10 uppercase tracking-tight">
                    <span>Итого</span>
                    <span className="text-brand-orange">{total.toLocaleString('ru-RU')} ₽</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-white text-black font-black py-5 uppercase tracking-[0.2em] hover:bg-brand-orange hover:text-white transition-all duration-300 flex items-center justify-center gap-3 text-xs shadow-lg group"
                >
                  <span className="group-hover:mr-2 transition-all">Оплатить</span> <ArrowRight className="h-4 w-4" />
                </button>
                
                <div className="mt-8 flex justify-center gap-3 text-gray-600 opacity-30">
                   <div className="w-10 h-6 bg-white rounded"></div>
                   <div className="w-10 h-6 bg-white rounded"></div>
                   <div className="w-10 h-6 bg-white rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Minimalist Apple-style Payment Modal */}
      {paymentStep !== 'idle' && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center transition-opacity duration-500">
          <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">
             
             {/* Phase 1: Processing - Minimalist Breathing Text */}
             {paymentStep === 'processing' && (
               <div className="flex flex-col items-center animate-fade-in">
                 <h3 className="text-white text-xs font-bold uppercase tracking-[0.5em] animate-breathing">
                   Обработка
                 </h3>
               </div>
             )}

             {/* Phase 2: Success - Smooth Reveal like "Hello" */}
             {paymentStep === 'success' && (
               <div className="flex flex-col items-center">
                 <h1 className="text-[12vw] font-black text-brand-orange leading-none tracking-tighter animate-apple-reveal">
                   MCR
                 </h1>
                 <p className="text-white text-sm md:text-lg font-light tracking-[0.4em] uppercase mt-8 animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                   Оплата Принята
                 </p>
               </div>
             )}

          </div>
        </div>
      )}
    </div>
  );
};
