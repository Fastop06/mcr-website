import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProducts, saveProduct, deleteProduct, resetDB } from '../lib/storage';
import { Plus, Edit2, Trash2, X, Save, RefreshCw } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  
  // Load products on mount
  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = () => {
    setProducts(getProducts());
  };

  const handleAddNew = () => {
    setCurrentProduct({
      name: '',
      category: 'Костюмы',
      price: 0,
      image: '/photos/suit-noir.jpg',
      description: '',
      sizes: ['S', 'M', 'L']
    });
    setIsEditing(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      deleteProduct(id);
      refreshProducts();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.price) return;
    
    // Convert comma separated sizes string to array if user typed manually
    // But for now we stick to simple array assuming UI handles it (or defaults)
    
    saveProduct(currentProduct as Product);
    setIsEditing(false);
    refreshProducts();
  };

  const handleReset = () => {
    if(window.confirm('Это сбросит все товары до заводских настроек. Продолжить?')) {
        resetDB();
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-brand-black px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Админ Панель</h1>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Управление товарами</p>
          </div>
          <div className="flex gap-4">
            <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 border border-red-900/50 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-900/20 transition-all"
            >
                <RefreshCw className="h-4 w-4" /> Сброс БД
            </button>
            <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
                <Plus className="h-4 w-4" /> Добавить товар
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
                <div key={product.id} className="bg-brand-paper border border-white/5 p-4 flex items-center gap-6 group hover:border-white/20 transition-colors">
                    <div className="h-16 w-12 bg-black flex-shrink-0 overflow-hidden">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-sm truncate">{product.name}</h3>
                        <p className="text-brand-orange text-[10px] uppercase tracking-widest">{product.category}</p>
                    </div>
                    <div className="text-right px-4">
                        <span className="text-white font-mono">{product.price.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => handleEdit(product)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded"
                        >
                            <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-gray-400 hover:text-brand-orange hover:bg-white/10 rounded"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Edit Modal */}
        {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                <div className="bg-brand-paper w-full max-w-2xl border border-white/10 shadow-2xl animate-scale-in">
                    <div className="flex justify-between items-center p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest">
                            {currentProduct.id ? 'Редактировать' : 'Новый товар'}
                        </h2>
                        <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Название</label>
                                <input 
                                    type="text" 
                                    value={currentProduct.name} 
                                    onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                                    className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-brand-orange outline-none text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Цена (RUB)</label>
                                <input 
                                    type="number" 
                                    value={currentProduct.price} 
                                    onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                                    className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-brand-orange outline-none text-sm font-mono"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Категория</label>
                            <select 
                                value={currentProduct.category}
                                onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}
                                className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-brand-orange outline-none text-sm"
                            >
                                {['Костюмы', 'Верхняя одежда', 'Повседневное', 'Обувь', 'Аксессуары'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Ссылка на изображение</label>
                            <div className="flex gap-4">
                                <input 
                                    type="text" 
                                    value={currentProduct.image} 
                                    onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})}
                                    className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-brand-orange outline-none text-sm"
                                    placeholder="/photos/..."
                                />
                                <div className="h-12 w-10 bg-black border border-white/10 overflow-hidden flex-shrink-0">
                                    {currentProduct.image && <img src={currentProduct.image} className="w-full h-full object-cover" />}
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-600">Для локальных фото используйте формат /photos/имя_файла.jpg</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Описание</label>
                            <textarea 
                                value={currentProduct.description} 
                                onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                                className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-brand-orange outline-none text-sm h-24"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-brand-orange text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="h-4 w-4" /> Сохранить
                        </button>
                    </form>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
