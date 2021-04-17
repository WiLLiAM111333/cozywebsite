export interface DiscordBan {
  banID: string;
  userID: string;
  guildID: string;
  unbanned: boolean;
  reason: string;
  bannedAt: number;
}
