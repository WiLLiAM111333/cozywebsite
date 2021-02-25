import Knex from "knex";
import { db } from '../src/db';

/**
 * A base class. Honestly old code I dont have alot of use for 🤡 
 * @exports
 * @abstract
 * @class
 */
export abstract class Base {
  /**
   * The databaes instance running in this application
   * @protected
   */
  protected db: Knex;

  /**
   * @public
   * @constructor
   */
  public constructor() {
    this.db = db;
  }
}
