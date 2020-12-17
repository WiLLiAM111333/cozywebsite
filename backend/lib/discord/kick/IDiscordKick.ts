import { Snowflake } from "discord.js";

export interface IDiscordKick {
  discordUserID: Snowflake;
  websiteUserID: string;
  reason?: string;
  kickedAt: string;
}
