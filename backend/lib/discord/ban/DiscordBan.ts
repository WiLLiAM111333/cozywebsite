import { Snowflake } from "discord.js";
import { DiscordBanConstructor } from "./DiscordBanConstructor";
import { IDiscordBan } from "./IDiscordBan";

export class DiscordBan implements IDiscordBan {
  public discordUserID: Snowflake;
  public websiteUserID: string;
  public reason?: string;
  public bannedAt: string;

  public constructor(data: DiscordBanConstructor) {
    this.discordUserID = data.discordUserID;
    this.websiteUserID = data.websiteUserID;
    this.reason = data.reason || 'No reason set';
    this.bannedAt = new Date().toLocaleString();
  }
}
