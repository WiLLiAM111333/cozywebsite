import { User } from "discord.js";
import { ModerationConfig } from "../config/ModerationConfig";

export interface ModerationEvents {
  warn: [User, User, string];
  report: [User, User, string];
  mute: [User, User, string];
  kick: [User, User, string];
  ban: [User, User, string];
  gifban: [User, User, string];
  externalEmoteBan: [User, User, string];
  configCreate: [ModerationConfig];
  configUpdate: [ModerationConfig];
}
