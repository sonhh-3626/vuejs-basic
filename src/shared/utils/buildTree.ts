export interface CategoryItem {
  id: number;
  title: string;
  count: number;
  parentId?: number | null;
  children?: CategoryItem[];
}

export const buildTree = (flatArray: CategoryItem[]): CategoryItem[] => {
  const map: Record<number, CategoryItem> = {};
  const roots: CategoryItem[] = [];

  flatArray.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  flatArray.forEach(item => {
    if (item.parentId == null) {
      roots.push(map[item.id]);
    } else {
      const parent = map[item.parentId];
      if (parent) {
        parent.children!.push(map[item.id]);
      }
    }
  });

  return roots;
};
