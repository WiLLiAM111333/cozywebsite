import { Snowflake } from "discord.js";

export interface DiscordReportConstructor {
  discordUserID: Snowflake;
  websiteUserID: string;
  reason: string;
  reporterDiscordID: string;
  reporterWebsiteID: string;
}
