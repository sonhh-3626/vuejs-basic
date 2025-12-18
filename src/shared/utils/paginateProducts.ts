import { ITEM_PER_PAGE } from "@/constants/pagination";
import type { Product } from "../types/Product";

export const paginateProducts = (
  currentPage: number,
  products: Product[]
): Product[] => {
  const start = (currentPage - 1) * ITEM_PER_PAGE;
  return products.slice(start, start + ITEM_PER_PAGE);
};
