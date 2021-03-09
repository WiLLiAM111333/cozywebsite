import { GuildMember } from "discord.js";
import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { DiscordBan } from "./DiscordBan";

const { DISCORD_BANS } = Constants.TableNames;

// Might use events
export class DiscordBanManager extends BaseManager<DiscordBan> implements IManager<DiscordBan> {
  public constructor(member: GuildMember) {
    super(member);
  }

  public async has(id: string): Promise<boolean> {
    try {
      return (await this.db.table(DISCORD_BANS).where({ userID: id })).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(): Promise<Array<DiscordBan> | null> {
    try {
      return (
        await this.db.table(DISCORD_BANS).where({
          userID: this.member.id,
          guildID: this.member.guild.id,
        })
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async get(id: string): Promise<DiscordBan | null> {
    try {
      return (
        await this.db.table(DISCORD_BANS).where({
          userID: this.member.id,
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
        userID: this.member.id,
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
        userID: this.member.id
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
