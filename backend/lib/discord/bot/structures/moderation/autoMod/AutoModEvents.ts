import { Invite, User } from "discord.js";
import { AutoModConfig } from "./AutoModConfig";

export interface AutoModEvents { 
  zalgo: [string, User];
  profanity: [string, User];
  externalLink: [string, User];
  repeatedText: [string, User];
  capsSpam: [User];
  emoteSpam: [User];
  spoilerSpam: [User];
  massPings: [User];
  inviteCreate: [Invite];
  inviteDelete: [Invite];
  blacklistedLink: [User];
  configCreate: [AutoModConfig];
  configUpdate: [AutoModConfig];
}
