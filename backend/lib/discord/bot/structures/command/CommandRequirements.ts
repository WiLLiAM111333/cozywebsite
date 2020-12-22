import { PermissionString } from "discord.js";

export interface CommandRequirements {
  ownerOnly: boolean;
  userPerms?: Array<PermissionString>;
  clientPerms?: Array<PermissionString>;
}
