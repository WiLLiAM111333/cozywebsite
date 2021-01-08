import Knex from "knex";
import { GuildMember } from "discord.js";
import { ManagerTypes } from "./ManagerTypes";
import { IManager } from "./IManager";

export abstract class BaseManager<T extends ManagerTypes> implements IManager<T> {
  protected db: Knex;
  protected member: GuildMember;

  public constructor(member: GuildMember) {
    this.member = member;
  }

  public abstract getAll(): Promise<Array<T>>;
  public abstract get(id: string): Promise<T>;
  public abstract add(data: T): Promise<boolean>;
  public abstract update(data: T): Promise<[T, T]>;
  public abstract delete(id: string): Promise<boolean>;

  protected handleError(err: unknown): void {
    console.log(err);
  }
}
