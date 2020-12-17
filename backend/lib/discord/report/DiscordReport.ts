import { Snowflake } from "discord.js";
import { DiscordReportConstructor } from "./DiscordReportConstructor";
import { IDiscordReport } from "./IDiscordReport";

export class DiscordReport implements IDiscordReport {
  public discordUserID: Snowflake;
  public websiteUserID: string;
  public reason: string;
  public reporterDiscordID: string;
  public reporterWebsiteID: string;
  public reportedAt: string;

  public constructor(data: DiscordReportConstructor) {
    this.discordUserID = data.discordUserID;
    this.websiteUserID = data.websiteUserID;
    this.reason = data.reason || 'No reason set';
    this.reporterDiscordID = data.reporterDiscordID;
    this.reporterWebsiteID = data.reporterWebsiteID;
    this.reportedAt = new Date().toLocaleString();
  }
}
