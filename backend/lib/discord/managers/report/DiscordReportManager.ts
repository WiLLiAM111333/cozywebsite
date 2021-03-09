import { GuildMember } from "discord.js";
import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { DiscordReport } from './DiscordReport';

const { DISCORD_REPORTS } = Constants.TableNames;

// Might use events
export class DiscordReportManager extends BaseManager<DiscordReport> implements IManager<DiscordReport> {
  public constructor(member: GuildMember) {
    super(member);
  }

  public async has(id: string): Promise<boolean> {
    try {
      return (await this.db.table(DISCORD_REPORTS).where({ userID: id })).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(): Promise<Array<DiscordReport>> {
    try {
      return (
        await this.db.table(DISCORD_REPORTS).where({
          userID: this.member.id,
          guildID: this.member.guild.id,
        })
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async get(id: string): Promise<DiscordReport> {
    try {
      return (
        await this.db.table(DISCORD_REPORTS).where({
          userID: this.member.id,
          guildID: this.member.guild.id,
          banID: id
        })
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordReport): Promise<boolean> {
    try {
      await this.db.table(DISCORD_REPORTS).where({
        userID: this.member.id,
        guildID: this.member.guild.id
      }).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(data: DiscordReport): Promise<[DiscordReport, DiscordReport]> {
    try {
      const oldData = await this.get(data.reportID);

      await this.db.table(DISCORD_REPORTS).where({
        guildID: this.member.guild.id,
        userID: this.member.id
      }).update(data);

      return [oldData, await this.get(data.reportID)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.db.table(DISCORD_REPORTS).where({
        banID: id
      }).delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
