import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { ManagerParams } from "../ManagerParams";
import { DiscordBan } from "./DiscordBan";

const { DISCORD_BANS } = Constants.TableNames;

// Might use events
export class DiscordBanManager extends BaseManager<DiscordBan> implements IManager<DiscordBan> {
  public constructor() {
    super();
  }

  public async has(whereObj: ManagerParams<DiscordBan>): Promise<boolean> {
    try {
      return (
        await this.db.table(DISCORD_BANS).where(whereObj)
      ).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(whereObj: ManagerParams<DiscordBan>): Promise<Array<DiscordBan> | null> {
    try {
      return (
        await this.db.table(DISCORD_BANS).where(whereObj)
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getOne(whereObj: ManagerParams<DiscordBan>): Promise<DiscordBan | null> {
    try {
      return (
        await this.db.table(DISCORD_BANS).where(whereObj)
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordBan): Promise<boolean> {
    try {
      await this.db.table(DISCORD_BANS).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(whereObj: ManagerParams<DiscordBan>, data: ManagerParams<DiscordBan>): Promise<[DiscordBan, DiscordBan]> {
    try {
      const oldData = await this.getOne(whereObj);

      await this.db.table(DISCORD_BANS)
        .where(whereObj)
        .update(data);

      return [oldData, await this.getOne(data)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(whereObj: ManagerParams<DiscordBan>): Promise<boolean> {
    try {
      await this.db.table(DISCORD_BANS)
        .where(whereObj)
        .delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
