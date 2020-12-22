export interface CommandHelp {
  name: string;
  description?: string;
  aliases?: Array<string>;
  cooldown?: number;
  args: Array<string[]>;
}
