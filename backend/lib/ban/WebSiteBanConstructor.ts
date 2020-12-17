import { Snowflake } from "discord.js";

export interface WebSiteBanConstructor {
  websiteUserID: string;
  discordUserID: Snowflake;
  reason: string;
}
