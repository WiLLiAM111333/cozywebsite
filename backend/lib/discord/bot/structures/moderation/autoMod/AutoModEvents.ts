import { Invite, GuildMember, Message } from "discord.js";
import { AutoModActionsConfig } from "./config/AutoModActionsConfig";
import { AutoModConfig } from "./config/AutoModConfig";

export interface AutoModEvents { 
  zalgo: [GuildMember, Message];
  profanity: [GuildMember, Message];
  externalLink: [GuildMember, Message];
  repeatedText: [GuildMember, Message];
  capsSpam: [GuildMember, Message];
  emoteSpam: [GuildMember, Message];
  spoilerSpam: [GuildMember, Message];
  massPings: [GuildMember, Message];
  blacklistedLink: [GuildMember, Message];
  boxDrawing: [GuildMember, Message];
  inviteCreate: [Invite];
  inviteDelete: [Invite];
  hoistUsername: [GuildMember];
  hoistNickname: [GuildMember];
  zalgoUsername: [GuildMember];
  zalgoNickname: [GuildMember];
  configCreate: [AutoModConfig];
  configUpdate: [AutoModConfig];
  actionsConfigCreate: [AutoModActionsConfig];
  actionsConfigUpdate: [AutoModActionsConfig];
}
