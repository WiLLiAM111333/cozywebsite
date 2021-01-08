export interface DiscordBan {
  banID: string;
  websiteUserID: string | null;
  discordUserID: string;
  reason: string;
  bannedAt: Date;
}
