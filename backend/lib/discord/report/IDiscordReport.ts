import { Snowflake } from "discord.js";

export interface IDiscordReport {
  discordUserID: Snowflake;
  websiteUserID: string;
  reason: string;
  reporterDiscordID: string;
  reporterWebsiteID: string;
  reportedAt: string;
}
