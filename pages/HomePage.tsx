import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { PageView } from '../types';
import { MCR_ADDRESS } from '../constants';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  isAuthenticated: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, isAuthenticated }) => {
  return (
    <div className="w-full">
      {/* Editorial Hero */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center overflow-hidden bg-brand-black">
        
        {/* Giant Background Text - ORANGE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 select-none">
          <h1 className="text-[35vw] font-black leading-none text-brand-orange opacity-20 tracking-tighter animate-pulse-glow">
            MCR
          </h1>
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex flex-col justify-end pb-24 md:pb-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            
            <div className="space-y-6 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-12 bg-brand-orange"></div>
                <span className="text-white font-bold tracking-[0.4em] text-xs uppercase">Ингушетия • Est. 2024</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-white uppercase leading-[0.9] tracking-tighter">
                Новый <br/> <span className="text-transparent text-outline">Уровень</span>
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs mb-8 md:text-right border-l-2 md:border-l-0 md:border-r-2 border-brand-orange pl-4 md:pl-0 md:pr-4">
                Безупречный стиль и качество в каждой детали. Одежда для тех, кто не идет на компромиссы.
              </p>
              <button 
                onClick={() => onNavigate(isAuthenticated ? PageView.SHOP : PageView.REGISTER)}
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black overflow-hidden transition-all hover:bg-brand-orange hover:text-white"
              >
                <div className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-xs">
                  {isAuthenticated ? "Перейти в каталог" : "Начать Покупки"}
                </span>
                <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Tape */}
      <div className="bg-brand-orange py-3 overflow-hidden border-y border-white/10 relative z-20">
         <div className="whitespace-nowrap flex gap-10 animate-[marquee_20s_linear_infinite]">
            {[...Array(10)].map((_, i) => (
               <span key={i} className="text-black font-black uppercase tracking-[0.2em] text-sm">
                 Luxury Menswear • Premium Quality • Ingushetia •
               </span>
            ))}
         </div>
      </div>

      {/* Minimalism Showcase */}
      <section className="bg-brand-black py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="space-y-8 order-2 md:order-1 animate-slide-up">
                 <h3 className="text-brand-orange font-bold uppercase tracking-[0.3em] text-xs">О Бренде</h3>
                 <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase">
                    Эстетика <br/> Минимализма
                 </h2>
                 <p className="text-gray-500 font-light leading-relaxed max-w-md">
                    MCR — это не просто магазин, это философия. Мы верим, что одежда должна подчеркивать характер мужчины, а не заглушать его. Строгие линии, премиальные ткани и внимание к мелочам.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-8 pt-8">
                    <div>
                       <h4 className="text-white font-bold text-2xl">100+</h4>
                       <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-1">Эксклюзивных позиций</p>
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-2xl">24/7</h4>
                       <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-1">Персональный сервис</p>
                    </div>
                 </div>
              </div>
              
              <div className="relative order-1 md:order-2 group">
                 <div className="absolute -inset-4 border border-brand-orange/30 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                 <div className="w-full h-[500px] bg-brand-paper flex items-center justify-center border border-white/10 relative overflow-hidden">
                     {/* Placeholder for About Image if needed, or keeping it abstract since we removed the main image */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-transparent"></div>
                     <h3 className="text-white font-black text-6xl opacity-10 uppercase tracking-tighter transform -rotate-12">MCR Est.2024</h3>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Location / Contact Minimal */}
      <section className="py-24 border-t border-white/5 bg-brand-paper">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Наш Флагман</h3>
               <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                  <MapPin className="h-4 w-4 text-brand-orange" />
                  <span className="text-sm tracking-wide">{MCR_ADDRESS}</span>
               </div>
            </div>
            <button className="px-8 py-4 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
               Показать на карте
            </button>
         </div>
      </section>
    </div>
  );
};