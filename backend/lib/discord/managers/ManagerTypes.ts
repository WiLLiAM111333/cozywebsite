import { DiscordBan } from "./ban/DiscordBan";
import { DiscordKick } from "./kick/DiscordKick";
import { DiscordMute } from "./mute/DiscordMute";
import { DiscordReport } from "./report/DiscordReport";
import { DiscordWarning } from "./warning/DiscordWarning";

export type ManagerTypes = DiscordBan
  | DiscordKick
  | DiscordMute
  | DiscordReport
  | DiscordWarning
