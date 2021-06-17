import { Snowflake } from "discord.js";

export interface ModerationConfig {
  guildID: Snowflake;
  staffRole: Snowflake;
  emoteBanRole: Snowflake | null;
  gifBanRole: Snowflake | null;
  mutedRole: Snowflake;
}
