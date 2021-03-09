import { GuildMember } from "discord.js";
import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { DiscordKick } from "./DiscordKick";

const { DISCORD_KICKS } = Constants.TableNames;

// Might use events
export class DiscordKickManager extends BaseManager<DiscordKick> implements IManager<DiscordKick> {
  public constructor(member: GuildMember) {
    super(member);
  }

  public async has(id: string): Promise<boolean> {
    try {
      return (await this.db.table(DISCORD_KICKS).where({ userID: id })).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(): Promise<Array<DiscordKick>> {
    try {
      return (
        await this.db.table(DISCORD_KICKS).where({
          userID: this.member.id,
          guildID: this.member.guild.id,
        })
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async get(id: string): Promise<DiscordKick> {
    try {
      return (
        await this.db.table(DISCORD_KICKS).where({
          userID: this.member.id,
          guildID: this.member.guild.id,
          banID: id
        })
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordKick): Promise<boolean> {
    try {
      await this.db.table(DISCORD_KICKS).where({
        userID: this.member.id,
        guildID: this.member.guild.id
      }).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(data: DiscordKick): Promise<[DiscordKick, DiscordKick]> {
    try {
      const oldData = await this.get(data.kickID);

      await this.db.table(DISCORD_KICKS).where({
        guildID: this.member.guild.id,
        userID: this.member.id
      }).update(data);

      return [oldData, await this.get(data.kickID)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.db.table(DISCORD_KICKS).where({
        banID: id
      }).delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
