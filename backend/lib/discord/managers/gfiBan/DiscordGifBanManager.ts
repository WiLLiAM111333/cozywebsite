import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { ManagerParams } from "../ManagerParams";
import { DiscordGifBan } from "./DiscordGifBan";

const { DISCORD_GIF_BANS } = Constants.TableNames;

// Might use events
export class DiscordGifBanManager extends BaseManager<DiscordGifBan> implements IManager<DiscordGifBan> {
  public constructor() {
    super();
  }

  public async has(whereObj: ManagerParams<DiscordGifBan>): Promise<boolean> {
    try {
      return (
        await this.db.table(DISCORD_GIF_BANS).where(whereObj)
      ).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(whereObj: ManagerParams<DiscordGifBan>): Promise<Array<DiscordGifBan> | null> {
    try {
      return (
        await this.db.table(DISCORD_GIF_BANS).where(whereObj)
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getOne(whereObj: ManagerParams<DiscordGifBan>): Promise<DiscordGifBan | null> {
    try {
      return (
        await this.db.table(DISCORD_GIF_BANS).where(whereObj)
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordGifBan): Promise<boolean> {
    try {
      await this.db.table(DISCORD_GIF_BANS).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(whereObj: ManagerParams<DiscordGifBan>, data: ManagerParams<DiscordGifBan>): Promise<[DiscordGifBan, DiscordGifBan]> {
    try {
      const oldData = await this.getOne(whereObj);

      await this.db.table(DISCORD_GIF_BANS)
        .where(whereObj)
        .update(data);

      return [oldData, await this.getOne(data)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(whereObj: ManagerParams<DiscordGifBan>): Promise<boolean> {
    try {
      await this.db.table(DISCORD_GIF_BANS)
        .where(whereObj)
        .delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
