export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  images: string[];
  brand: string;
  price: string;
}

export interface Category {
  name: string;
  slug: string;
}