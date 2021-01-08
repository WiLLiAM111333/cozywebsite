export interface DiscordWarning {
  websiteUserID: string | null;
  warnerWebsiteID: string | null;
  discordUserID: string;
  warnerDiscordUserID: string;
  guildID: string;
  warnID: string;
  reason: string;
  warnedAt: Date;
}
