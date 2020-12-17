import { Snowflake } from "discord.js";

export interface IDiscordBan {
  discordUserID: Snowflake;
  websiteUserID: string;
  reason?: string;
  bannedAt: string;
}
