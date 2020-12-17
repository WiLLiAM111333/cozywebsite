import { Snowflake } from "discord.js";

export interface IDiscordMute {
  discordUserID: Snowflake;
  websiteUserID: string;
  muterDiscordID: Snowflake;
  muterWebsiteID: string;
  reason: string;
  mutedAt: string;
}
