import React, { useState } from 'react';
import { Product, PageView } from '../types';
import { ArrowLeft, ShoppingBag, CreditCard, Check, X } from 'lucide-react';

interface ProductPageProps {
  product: Product;
  onNavigate: (page: PageView) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onNavigate, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'success'>('idle');
  const [showCartAnimation, setShowCartAnimation] = useState(false);

  const handleBuyNow = () => {
    if (!selectedSize) return;
    setPaymentStep('processing');
    
    // Simulate payment process with unified timing
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        setPaymentStep('idle');
        onNavigate(PageView.SHOP);
      }, 4000); // Slightly longer to admire the success state
    }, 2000);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize);
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-brand-black px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => onNavigate(PageView.SHOP)} 
          className="mb-12 flex items-center text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Назад в каталог
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Visual Side */}
          <div className="relative animate-scale-in">
             <div className="aspect-[3/4] w-full bg-brand-paper overflow-hidden relative group">
                <img 
                   src={product.image} 
                   alt={product.name}
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                   onError={(e) => e.currentTarget.src = 'https://dummyimage.com/600x800/111/333&text=No+Image'}
                 />
                 <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
             </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-10 border-b border-white/10 pb-10">
              <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-xs mb-4 block">{product.category}</span>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight leading-none">{product.name}</h1>
              <p className="text-3xl text-white font-mono font-light">{product.price.toLocaleString('ru-RU')} ₽</p>
            </div>
            
            <p className="text-gray-400 leading-loose mb-12 text-sm max-w-md font-light">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-bold uppercase text-xs tracking-widest">Выберите Размер</span>
                <span className="text-gray-600 text-[10px] uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Таблица размеров</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-12 px-4 flex items-center justify-center font-bold text-xs transition-all duration-300 border ${
                      selectedSize === size
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent border-white/20 text-gray-500 hover:border-brand-orange hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-5 max-w-md">
               <button 
                onClick={handleBuyNow}
                disabled={!selectedSize}
                className={`w-full py-5 px-6 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-500 relative overflow-hidden group border border-transparent ${
                  selectedSize 
                  ? 'bg-brand-orange text-white shadow-[0_0_20px_rgba(255,59,16,0.3)] hover:shadow-[0_0_40px_rgba(255,59,16,0.6)]' 
                  : 'bg-white/5 text-gray-600 cursor-not-allowed'
                }`}
              >
                <span className="relative z-10">Купить сейчас</span>
                <CreditCard className="relative z-10 h-4 w-4" />
              </button>
              
              <button 
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-5 px-6 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 border transition-all duration-300 ${
                  showCartAnimation ? 'bg-green-900/30 border-green-500 text-green-500' : 
                  selectedSize 
                  ? 'border-white/20 text-white hover:border-white hover:bg-white/5' 
                  : 'border-white/5 text-gray-600 cursor-not-allowed'
                }`}
              >
                {showCartAnimation ? (
                   <>Добавлено <Check className="h-4 w-4" /></>
                ) : (
                   <>В корзину <ShoppingBag className="h-4 w-4" /></>
                )}
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-[10px] uppercase tracking-widest text-gray-600">
               <span>Бесплатная доставка</span>
               <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
               <span>Гарантия MCR</span>
            </div>
          </div>
        </div>
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