export interface Product {
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