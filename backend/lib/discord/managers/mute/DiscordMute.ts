export interface DiscordMute {
  websiteUserID: string | null;
  discordUserID: string;
  muterDiscordID: string;
  muterWebsiteID: string;
  guildID: string;
  muteID: string;
  reason: string;
  mutedAt: Date;
}
