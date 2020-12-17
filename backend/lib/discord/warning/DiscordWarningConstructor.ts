import { Snowflake } from "discord.js";

export interface DiscordWarningConstructor {
  discordUserID: Snowflake;
  websiteUserID: string;
  reason: string;
  warnerDiscordID: string;
  warnerWebsiteID: string;
}
