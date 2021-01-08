import { GuildMember } from "discord.js";
import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { DiscordBan } from "./DiscordBan";

const { DISCORD_BANS } = Constants.TableNames;

// Might use events
export class DiscordBanManager extends BaseManager<DiscordBan> {
  public constructor(member: GuildMember) {
    super(member);
  }

  public async getAll(): Promise<Array<DiscordBan>> {
    try {
      return (
        await this.db.table(DISCORD_BANS).where({
          discordUserID: this.member.id,
          guildID: this.member.guild.id,
        })
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async get(id: string): Promise<DiscordBan> {
    try {
      return (
        await this.db.table(DISCORD_BANS).where({
          discordUserID: this.member.id,
          guildID: this.member.guild.id,
          banID: id
        })
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordBan): Promise<boolean> {
    try {
      await this.db.table(DISCORD_BANS).where({
        discordUserID: this.member.id,
        guildID: this.member.guild.id
      }).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(data: DiscordBan): Promise<[DiscordBan, DiscordBan]> {
    try {
      const oldData = await this.get(data.banID);

      await this.db.table(DISCORD_BANS).where({
        guildID: this.member.guild.id,
        discordUserID: this.member.id
      }).update(data);

      return [oldData, await this.get(data.banID)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.db.table(DISCORD_BANS).where({
        banID: id
      }).delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
