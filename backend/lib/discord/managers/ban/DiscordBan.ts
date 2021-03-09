export interface DiscordBan {
  banID: string;
  userID: string;
  guildID: string;
  unbanned: string;
  reason: string;
  bannedAt: Date;
}
