export interface Category {
  id: number
  title: string
  parentId: null | number
  count: number
  children?: Category[]
}
