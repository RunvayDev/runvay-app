import { ObjectId } from 'mongoose';
export interface Product {
    _id:  string | ObjectId;
    name: string;
    description?: string;
    price: number;
    stock: number;
    size: string[];
    color: string[]; 
    images: string[];
    slug: string;
  }
