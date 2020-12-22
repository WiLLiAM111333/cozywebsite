import { User } from "discord.js";

export interface ModerationEvents {
  warn: [User, User, string];
  mute: [User, User, string];
  kick: [User, User, string];
  ban: [User, User, string];
  gifban: [User, User, string];
  externalEmoteBan: [User, User, string];
  report: [User, User, string];
}
