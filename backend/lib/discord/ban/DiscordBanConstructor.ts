import { Snowflake } from "discord.js";

export interface DiscordBanConstructor {
  discordUserID: Snowflake;
  websiteUserID: string;
  reason?: string;
}
