import { PermissionFlags } from "discord.js";

export interface CommandConstructor {
  name: string;
  description?: string;
  aliases?: Array<string>;
  cooldown?: number;
  args: [...Array<string>];
  ownerOnly: boolean;
  userPerms?: Array<PermissionFlags>;
  clientPerms?: Array<PermissionFlags>;
}
