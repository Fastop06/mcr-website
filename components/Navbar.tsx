import React, { useEffect, useState } from 'react';
import { ShoppingBag, User as UserIcon, Menu, X, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  cartCount: number;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, currentPage, onNavigate, isAuthenticated }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar glass and prevent body scroll when menu is open
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  if (currentPage === PageView.REGISTER) return null;

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled || isMobileMenuOpen 
            ? 'bg-brand-black/90 backdrop-blur-xl border-white/5 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* Brand */}
            <div 
              className="relative z-[60] cursor-pointer group" 
              onClick={() => handleNav(PageView.HOME)}
            >
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white transition-colors duration-300 group-hover:text-brand-orange">
                MCR<span className="text-brand-orange group-hover:text-white transition-colors">.</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <button 
                onClick={() => handleNav(PageView.HOME)}
                className={`text-[11px] uppercase tracking-[0.2em] font-bold hover:text-brand-orange transition-colors ${currentPage === PageView.HOME ? 'text-brand-orange' : 'text-gray-400'}`}
              >
                Главная
              </button>
              {isAuthenticated && (
                <button 
                  onClick={() => handleNav(PageView.SHOP)}
                  className={`text-[11px] uppercase tracking-[0.2em] font-bold hover:text-brand-orange transition-colors ${currentPage === PageView.SHOP || currentPage === PageView.PRODUCT_DETAIL ? 'text-brand-orange' : 'text-gray-400'}`}
                >
                  Каталог
                </button>
              )}
              {!isAuthenticated && (
                <button 
                  onClick={() => handleNav(PageView.REGISTER)}
                  className="px-6 py-2 border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300"
                >
                  Вход
                </button>
              )}
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center gap-6">
              {isAuthenticated && (
                <>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <UserIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleNav(PageView.CART)}
                    className="text-gray-400 hover:text-brand-orange transition-colors relative group"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 h-4 w-4 bg-brand-orange rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Mobile Controls (Burger + Cart) */}
            <div className="flex items-center gap-6 md:hidden relative z-[60]">
               {isAuthenticated && (
                <button 
                  onClick={() => handleNav(PageView.CART)}
                  className={`transition-colors relative ${isMobileMenuOpen ? 'text-gray-500' : 'text-white hover:text-brand-orange'}`}
                >
                   <ShoppingBag className="h-6 w-6" />
                   {cartCount > 0 && !isMobileMenuOpen && (
                      <span className="absolute -top-1 -right-2 h-4 w-4 bg-brand-orange rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                </button>
               )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-brand-orange transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-black z-50 flex flex-col justify-center px-8 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
         <div className="flex flex-col items-start space-y-8 max-w-lg mx-auto w-full">
            <MobileMenuItem 
               onClick={() => handleNav(PageView.HOME)} 
               active={currentPage === PageView.HOME} 
               isOpen={isMobileMenuOpen}
               index={0}
            >
              Главная
            </MobileMenuItem>
            
            {isAuthenticated ? (
              <>
                <MobileMenuItem 
                  onClick={() => handleNav(PageView.SHOP)} 
                  active={currentPage === PageView.SHOP} 
                  isOpen={isMobileMenuOpen}
                  index={1}
                >
                  Каталог
                </MobileMenuItem>
                <MobileMenuItem 
                  onClick={() => handleNav(PageView.CART)} 
                  active={currentPage === PageView.CART} 
                  isOpen={isMobileMenuOpen}
                  index={2}
                >
                  Корзина 
                  {cartCount > 0 && <span className="text-brand-orange text-2xl align-top ml-2 font-mono">({cartCount})</span>}
                </MobileMenuItem>
              </>
            ) : (
               <MobileMenuItem 
                  onClick={() => handleNav(PageView.REGISTER)} 
                  active={false} 
                  isOpen={isMobileMenuOpen}
                  index={1} 
                  highlight
               >
                  Войти
               </MobileMenuItem>
            )}
         </div>

         {/* Decorative Footer */}
         <div className={`absolute bottom-12 left-8 right-8 transition-all duration-700 delay-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="h-[1px] w-full bg-white/10 mb-6"></div>
            <div className="flex justify-between items-end">
               <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Ingushetia • Est. 2024</p>
                  <p className="text-white text-sm font-light">MCR Luxury Store</p>
               </div>
               <div className="text-brand-orange font-black text-xl">MCR.</div>
            </div>
         </div>
      </div>
    </>
  );
};

// Helper Component for Menu Items
interface MobileMenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  index: number;
  highlight?: boolean;
  isOpen: boolean;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ children, onClick, active, index, highlight = false, isOpen }) => {
   return (
      <button 
         onClick={onClick}
         className={`group flex items-center text-4xl sm:text-5xl font-black uppercase tracking-tighter text-left transition-all duration-500 transform ${
            isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
         } ${highlight ? 'text-brand-orange' : active ? 'text-white' : 'text-gray-600 hover:text-white'}`}
         style={{ transitionDelay: `${index * 100}ms` }}
      >
         {children}
         {active && <ArrowRight className="ml-4 h-6 w-6 sm:h-8 sm:w-8 text-brand-orange animate-pulse" />}
      </button>
   );
};