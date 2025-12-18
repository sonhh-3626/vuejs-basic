import type { Product } from '@/shared/types/Product';
import axios from 'axios';
import { http } from '../api/http';

export async function fetchProductsFromServer(): Promise<Product[]> {
  try {
    const { data } = await http.get<Product[]>('/products');

    if (!Array.isArray(data)) {
      console.error('Invalid products response:', data);
      return [];
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        '[fetchProductsFromServer]',
        error.response?.status,
        error.message
      );
    } else {
      console.error('[fetchProductsFromServer]', error);
    }

    throw error;
  }
}
