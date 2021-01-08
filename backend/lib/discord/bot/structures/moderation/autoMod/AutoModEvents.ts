import { Invite, GuildMember } from "discord.js";
import { AutoModActionsConfig } from "./actions/AutoModActionsConfig";
import { AutoModConfig } from "./config/AutoModConfig";

export interface AutoModEvents { 
  zalgo: [GuildMember];
  profanity: [GuildMember];
  externalLink: [GuildMember];
  repeatedText: [GuildMember];
  capsSpam: [GuildMember];
  emoteSpam: [GuildMember];
  spoilerSpam: [GuildMember];
  massPings: [GuildMember];
  inviteCreate: [Invite];
  inviteDelete: [Invite];
  blacklistedLink: [GuildMember];
  hoistUsername: [GuildMember];
  hoistNickname: [GuildMember];
  zalgoUsername: [GuildMember];
  zalgoNickname: [GuildMember];
  boxDrawing: [GuildMember];
  configCreate: [AutoModConfig];
  configUpdate: [AutoModConfig];
  actionsConfigCreate: [AutoModActionsConfig];
  actionsConfigUpdate: [AutoModActionsConfig];
}
