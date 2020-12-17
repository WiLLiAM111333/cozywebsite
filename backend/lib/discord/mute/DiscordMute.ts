import { Snowflake } from "discord.js";
import { DiscordMuteConstructor } from "./DiscordMuteConstructor";

export class DiscordMute {
  public discordUserID: Snowflake;
  public websiteUserID: string;
  public muterDiscordID: Snowflake;
  public muterWebsiteID: string;
  public reason: string;
  public mutedAt: string;

  public constructor(data: DiscordMuteConstructor) {
    this.discordUserID = data.discordUserID;
    this.websiteUserID = data.websiteUserID;
    this.muterDiscordID = data.muterDiscordID;
    this.muterWebsiteID = data.muterWebsiteID;
    this.reason = data.reason || 'No reason set';
    this.mutedAt = new Date().toLocaleString();
  }
}
