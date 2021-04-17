import { ManagerParams } from "./ManagerParams";
import { ManagerTypes } from "./ManagerTypes";

export interface IManager<T extends ManagerTypes> {
  getAll(whereObj: ManagerParams<T>): Promise<Array<T>> | null;
  getOne(whereObj: ManagerParams<T>): Promise<T | null>;
  add(data: T): Promise<boolean>;
  update(whereObj: ManagerParams<T>, data: T): Promise<[T, T]>;
  delete(whereObj: ManagerParams<T>): Promise<boolean>;
  has(whereObj: ManagerParams<T>): Promise<boolean>;
}
