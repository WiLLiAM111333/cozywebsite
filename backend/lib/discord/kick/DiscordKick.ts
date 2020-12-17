import { Snowflake } from "discord.js";
import { DiscordKickConstructor } from "./DiscordKickConstructor";
import { IDiscordKick } from "./IDiscordKick";

export class DiscordKick implements IDiscordKick {
  public discordUserID: Snowflake;
  public websiteUserID: string;
  public reason?: string;
  public kickedAt: string;

  public constructor(data: DiscordKickConstructor) {
    this.discordUserID = data.discordUserID;
    this.websiteUserID = data.websiteUserID;
    this.reason = data.reason || 'No reason set';
    this.kickedAt = new Date().toLocaleString();
  }
}
