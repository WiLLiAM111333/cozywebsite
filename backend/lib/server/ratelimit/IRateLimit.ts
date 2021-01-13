import { Snowflake } from "discord.js";

export interface IRateLimit {
  discordUserID: Snowflake;
  websiteUserID: string;
  requestAmount: number;
  rateLimitedAt: string;
}
