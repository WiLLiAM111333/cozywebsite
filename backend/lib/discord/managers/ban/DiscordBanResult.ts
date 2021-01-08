import { Snowflake } from 'discord.js';

export type DiscordBanResult = Array<{
  discordUserID: Snowflake;
  guildID: Snowflake;
  banID: string;
  websiteUserID?: string;
  reason: string;
  bannedAt: Date;
}>
