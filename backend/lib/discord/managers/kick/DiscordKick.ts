export interface DiscordKick {
  websiteUserID: string | null;
  discordUserID: string;
  guildID: string;
  kickID: string;
  reason: string;
  kickedAt: Date;
}
