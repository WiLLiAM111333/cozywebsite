import { Snowflake } from "discord.js";

export interface IDiscordWarning {
  discordUserID: Snowflake;
  websiteUserID: string;
  reason: string;
  warnerDiscordID: string;
  warnerWebsiteID: string;
  warnedAt: string;
}
