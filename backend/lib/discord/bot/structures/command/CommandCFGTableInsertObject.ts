export interface CommandCFGTableInsertObject {
  id: string;
  cooldown: number;
  ownerOnly: 0 | 1;
  clientPerms: string;
  userPerms: string;
}
