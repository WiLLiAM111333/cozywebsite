import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { ManagerParams } from '../ManagerParams';
import { DiscordKick } from "./DiscordKick";

const { DISCORD_KICKS } = Constants.TableNames;

// Might use events
export class DiscordKickManager extends BaseManager<DiscordKick> implements IManager<DiscordKick> {
  public constructor() {
    super();
  }

  public async has(whereObj: ManagerParams<DiscordKick>): Promise<boolean> {
    try {
      return (await this.db.table(DISCORD_KICKS).where(whereObj)).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(whereObj: ManagerParams<DiscordKick>): Promise<Array<DiscordKick>> {
    try {
      return (
        await this.db.table(DISCORD_KICKS).where(whereObj)
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getOne(whereObj: ManagerParams<DiscordKick>): Promise<DiscordKick> {
    try {
      return (
        await this.db.table(DISCORD_KICKS).where(whereObj)
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordKick): Promise<boolean> {
    try {
      await this.db.table(DISCORD_KICKS).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(whereObj: ManagerParams<DiscordKick>, data: ManagerParams<DiscordKick>): Promise<[DiscordKick, DiscordKick]> {
    try {
      const oldData = await this.getOne(whereObj);

      await this.db.table(DISCORD_KICKS)
        .where(whereObj)
        .update(data);

      return [oldData, await this.getOne(data)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(whereObj: ManagerParams<DiscordKick>): Promise<boolean> {
    try {
      await this.db.table(DISCORD_KICKS)
        .where(whereObj)
        .delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
