import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { ManagerParams } from '../ManagerParams';
import { DiscordReport } from './DiscordReport';

const { DISCORD_REPORTS } = Constants.TableNames;

// Might use events
export class DiscordReportManager extends BaseManager<DiscordReport> implements IManager<DiscordReport> {
  public constructor() {
    super();
  }

  public async has(whereObj: ManagerParams<DiscordReport>): Promise<boolean> {
    try {
      return (
        await this.db.table(DISCORD_REPORTS).where(whereObj)
      ).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(whereObj: ManagerParams<DiscordReport>): Promise<Array<DiscordReport>> {
    try {
      return (
        await this.db.table(DISCORD_REPORTS).where(whereObj)
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getOne(whereObj: ManagerParams<DiscordReport>): Promise<DiscordReport> {
    try {
      return (
        await this.db.table(DISCORD_REPORTS).where(whereObj)
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordReport): Promise<boolean> {
    try {
      await this.db.table(DISCORD_REPORTS).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(whereObj: ManagerParams<DiscordReport>, data: ManagerParams<DiscordReport>): Promise<[DiscordReport, DiscordReport]> {
    try {
      const oldData = await this.getOne(whereObj);

      await this.db.table(DISCORD_REPORTS)
        .where(whereObj)
        .update(data);

      return [oldData, await this.getOne(data)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(whereObj: ManagerParams<DiscordReport>): Promise<boolean> {
    try {
      await this.db.table(DISCORD_REPORTS)
        .where(whereObj)
        .delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
