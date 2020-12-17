import { PermissionString } from "discord.js";

export interface CommandConstructor {
  name: string;
  description?: string;
  aliases?: Array<string>;
  cooldown?: number;
  args?: Array<string[]>;
  ownerOnly?: boolean;
  userPerms?: Array<PermissionString>;
  clientPerms?: Array<PermissionString>;
  ignoreBots?: boolean;
}
