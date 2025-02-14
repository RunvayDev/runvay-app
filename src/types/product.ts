 export interface Product {
    _id:  string  ;
    name: string;
    description?: string;
    price: number;
    stock: number;
    size: string[];
    color: string[]; 
    images: string[];
    slug: string;
  }
