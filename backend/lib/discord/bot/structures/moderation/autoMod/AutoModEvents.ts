import { Invite, User } from "discord.js";
import { ModerationEvents } from "../ModerationEvents";

export interface AutoModEvents extends ModerationEvents {
  zalgo: [string, User];
  profanity: [string, User];
  externalLink: [string, User];
  repeatedText: [string, User];
  capsSpam: [User];
  emojiSpam: [User];
  spoilerSpam: [User];
  massPings: [User];
  inviteCreate: [Invite];
  inviteDelete: [Invite];
}
