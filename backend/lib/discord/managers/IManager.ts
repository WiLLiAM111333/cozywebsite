export interface IManager<T> {
  getAll(): Promise<Array<T>>;
  get(id: string): Promise<T>;
  add(data: T): Promise<boolean>;
  update(data: T): Promise<[T, T]>
  delete(id: string): Promise<boolean>;
}
