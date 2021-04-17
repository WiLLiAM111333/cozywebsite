import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { ManagerParams } from "../ManagerParams";
import { DiscordEmoteBan } from "./DiscordEmoteBan";

const { DISCORD_EMOTE_BANS } = Constants.TableNames;

// Might use events
export class DiscordEmoteBanManager extends BaseManager<DiscordEmoteBan> implements IManager<DiscordEmoteBan> {
  public constructor() {
    super();
  }

  public async has(whereObj: ManagerParams<DiscordEmoteBan>): Promise<boolean> {
    try {
      return (
        await this.db.table(DISCORD_EMOTE_BANS).where(whereObj)
      ).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(whereObj: ManagerParams<DiscordEmoteBan>): Promise<Array<DiscordEmoteBan> | null> {
    try {
      return (
        await this.db.table(DISCORD_EMOTE_BANS).where(whereObj)
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getOne(whereObj: ManagerParams<DiscordEmoteBan>): Promise<DiscordEmoteBan | null> {
    try {
      return (
        await this.db.table(DISCORD_EMOTE_BANS).where(whereObj)
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordEmoteBan): Promise<boolean> {
    try {
      await this.db.table(DISCORD_EMOTE_BANS).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(whereObj: ManagerParams<DiscordEmoteBan>, data: ManagerParams<DiscordEmoteBan>): Promise<[DiscordEmoteBan, DiscordEmoteBan]> {
    try {
      const oldData = await this.getOne(whereObj);

      await this.db.table(DISCORD_EMOTE_BANS)
        .where(whereObj)
        .update(data);

      return [oldData, await this.getOne(data)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(whereObj: ManagerParams<DiscordEmoteBan>): Promise<boolean> {
    try {
      await this.db.table(DISCORD_EMOTE_BANS)
        .where(whereObj)
        .delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
