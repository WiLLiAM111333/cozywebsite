export interface DiscordReport {
  websiteUserID: string | null;
  reporterWbesiteUserID: string | null;
  discordUserID: string | null;
  reporterDiscordUserID: string;
  reportID: string;
  guildID: string;
  reason: string;
  reportedAt: Date;
}
