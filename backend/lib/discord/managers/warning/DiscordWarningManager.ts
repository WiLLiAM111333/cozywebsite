import { GuildMember } from "discord.js";
import { Constants } from '../../../../src/utils/constants';
import { BaseManager } from "../BaseManager";
import { IManager } from "../IManager";
import { DiscordWarning } from './DiscordWarning';

const { DISCORD_WARNS } = Constants.TableNames;

// Might use events
export class DiscordWarningManager extends BaseManager<DiscordWarning> implements IManager<DiscordWarning> {
  public constructor(member: GuildMember) {
    super(member);
  }

  public async has(id: string): Promise<boolean> {
    try {
      return (await this.db.table(DISCORD_WARNS).where({ userID: id })).length > 0;
    } catch (err) {
      super.handleError(err);
    }
  }

  public async getAll(): Promise<Array<DiscordWarning>> {
    try {
      return (
        await this.db.table(DISCORD_WARNS).where({
          userID: this.member.id,
          guildID: this.member.guild.id,
        })
      );
    } catch (err) {
      super.handleError(err);
    }
  }

  public async get(id: string): Promise<DiscordWarning> {
    try {
      return (
        await this.db.table(DISCORD_WARNS).where({
          userID: this.member.id,
          guildID: this.member.guild.id,
          banID: id
        })
      )[0];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async add(data: DiscordWarning): Promise<boolean> {
    try {
      await this.db.table(DISCORD_WARNS).where({
        userID: this.member.id,
        guildID: this.member.guild.id
      }).insert(data);

      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }

  public async update(data: DiscordWarning): Promise<[DiscordWarning, DiscordWarning]> {
    try {
      const oldData = await this.get(data.warnID);

      await this.db.table(DISCORD_WARNS).where({
        guildID: this.member.guild.id,
        userID: this.member.id
      }).update(data);

      return [oldData, await this.get(data.warnID)];
    } catch (err) {
      super.handleError(err);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.db.table(DISCORD_WARNS).where({
        banID: id
      }).delete();
      
      return true;
    } catch (err) {
      super.handleError(err);
      return false;
    }
  }
}
