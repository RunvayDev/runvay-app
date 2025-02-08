export interface Product {
    name: string;
    description?: string;
    price: number;
    stock: number;
    size?: string[];
    color?: string[]; 
    images?: string[];
    slug: string;
  }
