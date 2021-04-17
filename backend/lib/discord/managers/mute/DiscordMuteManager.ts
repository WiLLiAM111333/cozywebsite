import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { ManagerParams } from '../ManagerParams';
import { DiscordMute } from './DiscordMute';

const { DISCORD_MUTES } = Constants.TableNames;

// Might use events
export class DiscordMuteManager extends BaseManager<DiscordMute> implements IManager<DiscordMute> {
  public constructor() {
    super();
  }

  public async has(whereObj: ManagerParams<DiscordMute>): Promise<boolean> {
    try {
      return (
        await this.db.table(DISCORD_MUTES).where(whereObj)
      ).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(whereObj: ManagerParams<DiscordMute>): Promise<Array<DiscordMute>> {
    try {
      return (
        await this.db.table(DISCORD_MUTES).where(whereObj)
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getOne(whereObj: ManagerParams<DiscordMute>): Promise<DiscordMute> {
    try {
      return (
        await this.db.table(DISCORD_MUTES).where(whereObj)
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordMute): Promise<boolean> {
    try {
      await this.db.table(DISCORD_MUTES).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(whereObj: ManagerParams<DiscordMute>, data: ManagerParams<DiscordMute>): Promise<[DiscordMute, DiscordMute]> {
    try {
      const oldData = await this.getOne(whereObj);

      await this.db.table(DISCORD_MUTES)
        .where(whereObj)
        .update(data);

      return [oldData, await this.getOne(data)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(whereObj: ManagerParams<DiscordMute>): Promise<boolean> {
    try {
      await this.db.table(DISCORD_MUTES)
        .where(whereObj)
        .delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
