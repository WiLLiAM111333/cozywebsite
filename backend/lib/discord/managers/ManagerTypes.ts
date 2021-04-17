import { DiscordBan } from "./ban/DiscordBan";
import { DiscordEmoteBan } from "./emoteBan/DiscordEmoteBan";
import { DiscordGifBan } from "./gfiBan/DiscordGifBan";
import { DiscordKick } from "./kick/DiscordKick";
import { DiscordMute } from "./mute/DiscordMute";
import { DiscordReport } from "./report/DiscordReport";
import { DiscordWarning } from "./warning/DiscordWarning";

export type ManagerTypes = DiscordBan
  | DiscordKick
  | DiscordMute
  | DiscordReport
  | DiscordWarning
  | DiscordGifBan
  | DiscordEmoteBan
