import { Product } from './types';

export const MCR_ADDRESS = "Республика Ингушетия, ул. Картоева 154";
export const MCR_PHONE = "+7 (999) 000-00-00";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Классический костюм Noir",
    category: "Костюмы",
    price: 45000,
    image: "/photos/suit-noir.jpg",
    description: "Классический черный костюм из итальянской шерсти. Идеальный выбор для деловых встреч и торжественных мероприятий.",
    sizes: ["46", "48", "50", "52", "54"]
  },
  {
    id: 2,
    name: "Бомбер Orange Horizon",
    category: "Верхняя одежда",
    price: 18500,
    image: "/photos/bomber-orange.jpg",
    description: "Стильный бомбер с фирменными акцентами. Высококачественная фурнитура и водоотталкивающая ткань.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Бархатный вечерний пиджак",
    category: "Костюмы",
    price: 32000,
    image: "/photos/velvet-blazer.jpg",
    description: "Бархатный пиджак глубокого темного оттенка. Роскошь в каждой детали.",
    sizes: ["48", "50", "52"]
  },
  {
    id: 4,
    name: "Кожаные дерби Minimalist",
    category: "Обувь",
    price: 24000,
    image: "/photos/derby-shoes.jpg",
    description: "Классические дерби из натуральной кожи ручной работы. Комфорт и элегантность.",
    sizes: ["40", "41", "42", "43", "44", "45"]
  },
  {
    id: 5,
    name: "Худи MCR Signature",
    category: "Повседневное",
    price: 12000,
    image: "/photos/hoodie-signature.jpg",
    description: "Худи оверсайз кроя с вышитым логотипом. Плотный хлопок премиум качества.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 6,
    name: "Кашемировая водолазка",
    category: "Повседневное",
    price: 15500,
    image: "/photos/cashmere-rollneck.jpg",
    description: "Водолазка из 100% кашемира. Невероятно мягкая и теплая.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 7,
    name: "Шелковый платок",
    category: "Аксессуары",
    price: 3500,
    image: "/photos/silk-square.jpg",
    description: "Нагрудный платок из натурального шелка с абстрактным узором.",
    sizes: ["One Size"]
  },
  {
    id: 8,
    name: "Пальто Modern Classic",
    category: "Верхняя одежда",
    price: 54000,
    image: "/photos/coat-classic.jpg",
    description: "Пальто прямого кроя. Строгие линии и тепло.",
    sizes: ["30", "32", "34", "36"]
  },
  {
    id: 9,
    name: "Брюки Карго Tactical",
    category: "Повседневное",
    price: 14500,
    image: "/photos/cargo-pants.jpg",
    description: "Брюки карго с анатомическим кроем. Идеальное сочетание стиля и удобства.",
    sizes: ["30", "32", "34", "36"]
  },
  {
    id: 10,
    name: "Сумка Weekender",
    category: "Аксессуары",
    price: 38000,
    image: "/photos/bag-weekender.jpg",
    description: "Кожаная дорожная сумка. Вместительная и стильная.",
    sizes: ["One Size"]
  },
  {
    id: 11,
    name: "Очки Aviator Black",
    category: "Аксессуары",
    price: 11000,
    image: "/photos/sunglasses.jpg",
    description: "Солнцезащитные очки в черной оправе. Поляризационные линзы.",
    sizes: ["One Size"]
  },
  {
    id: 12,
    name: "Челси Suede",
    category: "Обувь",
    price: 28000,
    image: "/photos/chelsea-boots.jpg",
    description: "Замшевые ботинки челси. Итальянская колодка.",
    sizes: ["41", "42", "43", "44"]
  }
];