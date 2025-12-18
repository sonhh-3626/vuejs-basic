import type { Product } from '../types/Product';

export const calculateRatingCounts = (
  products: Product[]
): Array<{ stars: number; count: number }> => {
  const counts = new Map<number, number>([
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0]
  ]);

  for (const product of products) {
    const rating = Math.floor(product.rating);
    for (let star = 1; star <= rating; star++) {
      counts.set(star, counts.get(star)! + 1);
    }
  }

  return [4, 3, 2, 1].map(stars => ({
    stars,
    count: counts.get(stars) ?? 0
  }));
};
