export interface IItem<T = ItemType> {
  type: T;
  id: string;
  price: number;
}
