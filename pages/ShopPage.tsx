import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Product, PageView } from '../types';
import { Search } from 'lucide-react';

interface ShopPageProps {
  onProductClick: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onProductClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');

  const categories = ['Все', 'Костюмы', 'Верхняя одежда', 'Повседневное', 'Обувь', 'Аксессуары'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Все' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen pt-24 bg-brand-black">
      
      {/* Header with Glass Droplet Menu */}
      {/* Changed: 'sticky top-24' -> 'relative md:sticky md:top-24' */}
      <div className="relative md:sticky md:top-24 z-30 glass-panel border-b border-white/5 mb-12">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <div className="flex flex-col items-center space-y-8">
               <h2 className="text-xl font-bold uppercase tracking-[0.5em] text-white animate-fade-in">Коллекция</h2>
               
               {/* Droplet Menu */}
               <div className="flex justify-center flex-wrap gap-2 md:gap-4 pb-2 animate-slide-up">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="group relative px-6 py-3 overflow-hidden rounded-full transition-all duration-300"
                    >
                      <span className={`relative z-10 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${activeCategory === cat ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {cat}
                      </span>
                      {/* Active State Background */}
                      {activeCategory === cat && (
                        <div className="absolute inset-0 bg-brand-orange rounded-full"></div>
                      )}
                      {/* Hover State Background */}
                      {activeCategory !== cat && (
                        <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        
        <div className="flex justify-end mb-12 animate-fade-in">
           <div className="relative group w-full md:w-80">
              <input 
                type="text" 
                placeholder="ПОИСК ТОВАРА" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-3 pl-0 pr-10 text-white text-sm uppercase tracking-widest focus:outline-none focus:border-brand-orange transition-all duration-500 placeholder-gray-700"
              />
              <Search className="absolute right-0 top-3 h-5 w-5 text-gray-600 group-focus-within:text-brand-orange transition-colors" />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              onClick={() => onProductClick(product)}
              className="group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container with Sharp Hover Effect */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-brand-paper">
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                
                {/* Minimalist Border Hover */}
                <div className="absolute inset-4 border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 z-20"></div>

                {/* View Button */}
                <div className="absolute bottom-0 left-0 w-full bg-brand-orange/90 backdrop-blur text-white py-4 text-center text-xs font-bold tracking-[0.2em] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30">
                   Смотреть
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-[10px] text-brand-orange font-bold uppercase tracking-[0.2em]">{product.category}</p>
                <h3 className="text-white font-bold text-sm tracking-widest uppercase group-hover:text-brand-orange transition-colors duration-300 truncate px-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs font-mono group-hover:text-white transition-colors">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-40 border-t border-white/5 mt-12 animate-fade-in">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase">Архив пуст</p>
          </div>
        )}
      </div>
    </div>
  );
};