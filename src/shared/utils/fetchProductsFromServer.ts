import axios from 'axios';
import type { Product } from '../types/Product';

export async function fetchProductsFromServer(): Promise<Product[]> {
  const response = await axios.get(`http://localhost:3000/products`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch products from server');
  }
  const data: Product[] = response.data;
  return data;
}
