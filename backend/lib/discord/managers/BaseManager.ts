import Knex from "knex";
import { ManagerTypes } from "./ManagerTypes";
import { IManager } from "./IManager";
import { ManagerParams } from "./ManagerParams";
import { db } from '../../../src/db';

export abstract class BaseManager<T extends ManagerTypes> implements IManager<T> {
  protected db: Knex;

  public constructor() {
    this.db = db;
  }

  public abstract getAll(whereObj: ManagerParams<T>): Promise<Array<T>>;
  public abstract getOne(whereObj: ManagerParams<T>): Promise<T>;
  public abstract add(data: T): Promise<boolean>;
  public abstract update(whereObj: ManagerParams<T>, data: T): Promise<[T, T]>;
  public abstract delete(whereObj: ManagerParams<T>): Promise<boolean>;
  public abstract has(whereObj: ManagerParams<T>): Promise<boolean>;

  /**
   * TODO
   * * Error Handling
   */
  protected handleError(err: unknown): void {
    console.log(err);
  }
}
