export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  images: string[];
  brand: string;
  price: number;
}

export interface Category {
  name: string;
  slug: string;
}

export interface CartProduct {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}