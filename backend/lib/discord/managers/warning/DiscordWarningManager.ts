import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { ManagerParams } from "../ManagerParams";
import { DiscordWarning } from './DiscordWarning';

const { DISCORD_WARNS } = Constants.TableNames;

// Might use events
export class DiscordWarningManager extends BaseManager<DiscordWarning> implements IManager<DiscordWarning> {
  public constructor() {
    super();
  }

  public async has(whereObj: ManagerParams<DiscordWarning>): Promise<boolean> {
    try {
      return (
        await this.db.table(DISCORD_WARNS).where(whereObj)
      ).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(whereObj: ManagerParams<DiscordWarning>): Promise<Array<DiscordWarning>> {
    try {
      return (
        await this.db.table(DISCORD_WARNS).where(whereObj)
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getOne(whereObj: ManagerParams<DiscordWarning>): Promise<DiscordWarning> {
    try {
      return (
        await this.db.table(DISCORD_WARNS).where(whereObj)
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordWarning): Promise<boolean> {
    try {
      await this.db.table(DISCORD_WARNS).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(whereObj: ManagerParams<DiscordWarning>, data: ManagerParams<DiscordWarning>): Promise<[DiscordWarning, DiscordWarning]> {
    try {
      const oldData = await this.getOne(whereObj);

      await this.db.table(DISCORD_WARNS)
        .where(whereObj)
        .update(data);

      return [oldData, await this.getOne(data)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(whereObj: ManagerParams<DiscordWarning>): Promise<boolean> {
    try {
      await this.db.table(DISCORD_WARNS)
        .where(whereObj)
        .delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
