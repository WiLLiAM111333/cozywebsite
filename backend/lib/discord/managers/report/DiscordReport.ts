export interface DiscordReport {
  userID: string;
  reporterID: string;
  reportID: string;
  guildID: string;
  reason: string;
  reportedAt: number;
}
