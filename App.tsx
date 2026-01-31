import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { PageView, Product, CartItem, User } from './types';
import { initDB } from './lib/storage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Preloader & DB Init
  useEffect(() => {
    initDB(); // Initialize LocalStorage DB
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLogin = (name: string, isAdmin: boolean = false) => {
    setUser({ name, email: '', isAdmin });
    setCurrentPage(isAdmin ? PageView.ADMIN : PageView.SHOP);
  };

  const handleNavigate = (page: PageView) => {
    if ((page === PageView.SHOP || page === PageView.CART || page === PageView.PRODUCT_DETAIL) && !user) {
      setCurrentPage(PageView.REGISTER);
      return;
    }
    // Protect Admin Route
    if (page === PageView.ADMIN && (!user || !user.isAdmin)) {
        return; 
    }
    setCurrentPage(page);
  };

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage(PageView.PRODUCT_DETAIL);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-brand-black z-[100] flex flex-col items-center justify-center">
        <div className="relative">
          <h1 className="text-8xl font-black text-brand-orange animate-pulse">MCR</h1>
          <div className="absolute top-0 left-0 w-full h-full bg-brand-black animate-[revealSlow_2.5s_ease-in-out_forwards]"></div>
        </div>
        <div className="mt-8 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-brand-orange w-full animate-[slideUp_2s_ease-in-out_infinite_alternate]"></div>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case PageView.HOME:
        return <HomePage onNavigate={handleNavigate} isAuthenticated={!!user} />;
      case PageView.REGISTER:
        return <RegisterPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case PageView.SHOP:
        return <ShopPage onProductClick={handleProductClick} />;
      case PageView.PRODUCT_DETAIL:
        if (!selectedProduct) return <ShopPage onProductClick={handleProductClick} />;
        return <ProductPage 
          product={selectedProduct} 
          onNavigate={handleNavigate} 
          onAddToCart={addToCart}
        />;
      case PageView.CART:
        return <CartPage 
          items={cart} 
          onRemove={removeFromCart} 
          onNavigate={handleNavigate} 
          onClearCart={clearCart}
        />;
      case PageView.ADMIN:
        return <AdminPage />;
      default:
        return <HomePage onNavigate={handleNavigate} isAuthenticated={!!user} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-white font-sans selection:bg-brand-orange selection:text-white">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={!!user}
        isAdmin={user?.isAdmin}
      />
      
      <main className="flex-grow relative">
        <div className="animate-fade-in">
          {renderPage()}
        </div>
      </main>

      {(currentPage !== PageView.REGISTER) && (
        <Footer />
      )}
    </div>
  );
};

export default App;
