import { Snowflake } from "discord.js";

export interface DiscordMuteConstructor {
  discordUserID: Snowflake;
  websiteUserID: string;
  muterDiscordID: Snowflake;
  muterWebsiteID: string;
  reason: string;
}
