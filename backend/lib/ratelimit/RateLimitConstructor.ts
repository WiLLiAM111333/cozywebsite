import { Snowflake } from "discord.js";

export interface RateLimitConstructor {
  discordUserID: Snowflake;
  websiteUserID: string;
  requestAmount: number;
}
