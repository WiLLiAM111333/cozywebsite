import { Snowflake } from "discord.js";
import { DiscordWarningConstructor } from "./DiscordWarningConstructor";
import { IDiscordWarning } from "./IDiscordWarning";

export class DiscordWarning implements IDiscordWarning {
  public discordUserID: Snowflake;
  public websiteUserID: string;
  public reason: string;
  public warnerDiscordID: string;
  public warnerWebsiteID: string;
  public warnedAt: string;

  public constructor(data: DiscordWarningConstructor) {
    this.reason = data.reason || 'No reason set';
    this.discordUserID = data.discordUserID;
    this.websiteUserID = data.websiteUserID;
    this.warnerDiscordID = data.warnerDiscordID;
    this.warnerWebsiteID = data.warnerWebsiteID;
    this.warnedAt = new Date().toLocaleString();
  }
}
