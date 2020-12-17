import { Snowflake } from "discord.js";

export interface IWebSiteBan {
  websiteUserID: string;
  discordUserID: Snowflake;
  bannedAt: string;
  reason: string;
}
