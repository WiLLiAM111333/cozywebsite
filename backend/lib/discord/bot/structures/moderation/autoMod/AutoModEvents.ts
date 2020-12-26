import { Invite, GuildMember } from "discord.js";
import { AutoModConfig } from "./AutoModConfig";

export interface AutoModEvents { 
  zalgo: [string, GuildMember];
  profanity: [string, GuildMember];
  externalLink: [string, GuildMember];
  repeatedText: [string, GuildMember];
  capsSpam: [GuildMember];
  emoteSpam: [GuildMember];
  spoilerSpam: [GuildMember];
  massPings: [GuildMember];
  inviteCreate: [Invite];
  inviteDelete: [Invite];
  blacklistedLink: [GuildMember];
  configCreate: [AutoModConfig];
  configUpdate: [AutoModConfig];
}
