import { PermissionFlags } from "discord.js";

export interface CommandRequirements {
  ownerOnly: boolean;
  userPerms?: Array<PermissionFlags>;
  clientPerms?: Array<PermissionFlags>;
}
