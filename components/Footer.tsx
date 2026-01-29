import React from 'react';
import { MCR_ADDRESS, MCR_PHONE } from '../constants';
import { MapPin, Phone, Instagram, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tighter text-white">MCR</h2>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Элитная мужская одежда, созданная для тех, кто ценит качество, стиль и статус. 
              Индивидуальный подход к каждому образу.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Контакты</h3>
            <div className="flex items-start space-x-4 text-gray-400 font-light text-sm">
              <MapPin className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
              <span>{MCR_ADDRESS}</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-400 font-light text-sm">
              <Phone className="h-5 w-5 text-brand-orange flex-shrink-0" />
              <span>{MCR_PHONE}</span>
            </div>
          </div>

          {/* Social / Newsletter */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Следите за нами</h3>
            <div className="flex space-x-4">
              <a href="#" className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white text-gray-400 transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white text-gray-400 transition-all duration-300">
                <Send className="h-5 w-5" />
              </a>
            </div>
            <p className="text-[10px] text-gray-600 pt-6 uppercase tracking-widest">© 2024 MCR Menswear. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
