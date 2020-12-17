import { Snowflake } from "discord.js";

export interface DiscordKickConstructor {
  discordUserID: Snowflake;
  websiteUserID: string;
  reason?: string;
}
