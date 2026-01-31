export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export enum PageView {
  HOME = 'HOME',
  REGISTER = 'REGISTER',
  SHOP = 'SHOP',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  ADMIN = 'ADMIN',
}

export interface User {
  name: string;
  email: string;
  isAdmin?: boolean;
}
