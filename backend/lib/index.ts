import Knex from "knex";
import { db } from '../src/db';

export abstract class Base {
  protected static db: Knex = db;
  protected db: Knex = db;
}
