import { GuildMember } from "discord.js";
import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { DiscordReport } from './DiscordReport';

const { DISCORD_REPORTS } = Constants.TableNames;

// Might use events
export class DiscordReportManager extends BaseManager<DiscordReport> {
  public constructor(member: GuildMember) {
    super(member);
  }

  public async getAll(): Promise<Array<DiscordReport>> {
    try {
      return (
        await this.db.table(DISCORD_REPORTS).where({
          discordUserID: this.member.id,
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
          discordUserID: this.member.id,
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
        discordUserID: this.member.id,
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
        discordUserID: this.member.id
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
