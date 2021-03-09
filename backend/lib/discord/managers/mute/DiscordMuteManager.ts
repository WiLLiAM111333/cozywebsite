import { GuildMember } from "discord.js";
import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { DiscordMute } from './DiscordMute';

const { DISCORD_MUTES } = Constants.TableNames;

// Might use events
export class DiscordMuteManager extends BaseManager<DiscordMute> implements IManager<DiscordMute> {
  public constructor(member: GuildMember) {
    super(member);
  }

  public async has(id: string): Promise<boolean> {
    try {
      return (await this.db.table(DISCORD_MUTES).where({ userID: id })).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(): Promise<Array<DiscordMute>> {
    try {
      return (
        await this.db.table(DISCORD_MUTES).where({
          userID: this.member.id,
          guildID: this.member.guild.id,
        })
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async get(id: string): Promise<DiscordMute> {
    try {
      return (
        await this.db.table(DISCORD_MUTES).where({
          userID: this.member.id,
          guildID: this.member.guild.id,
          banID: id
        })
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordMute): Promise<boolean> {
    try {
      await this.db.table(DISCORD_MUTES).where({
        userID: this.member.id,
        guildID: this.member.guild.id
      }).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(data: DiscordMute): Promise<[DiscordMute, DiscordMute]> {
    try {
      const oldData = await this.get(data.muteID);

      await this.db.table(DISCORD_MUTES).where({
        guildID: this.member.guild.id,
        userID: this.member.id
      }).update(data);

      return [oldData, await this.get(data.muteID)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.db.table(DISCORD_MUTES).where({
        banID: id
      }).delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
