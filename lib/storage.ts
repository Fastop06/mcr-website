import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

const DB_KEY = 'mcr_products_db_v1';

// Initialize DB with default products if empty
export const initDB = () => {
  const existing = localStorage.getItem(DB_KEY);
  if (!existing) {
    localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_PRODUCTS));
  }
};

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProduct = (product: Product) => {
  const products = getProducts();
  const existingIndex = products.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    // Update
    products[existingIndex] = product;
  } else {
    // Create new (generate ID)
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    product.id = newId;
    products.push(product);
  }
  
  localStorage.setItem(DB_KEY, JSON.stringify(products));
  return product;
};

export const deleteProduct = (id: number) => {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem(DB_KEY, JSON.stringify(products));
};

export const resetDB = () => {
  localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_PRODUCTS));
  window.location.reload();
};
