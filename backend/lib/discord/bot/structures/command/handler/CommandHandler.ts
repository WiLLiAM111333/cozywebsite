import Knex from "knex";
import { Message, PermissionString, MessageEmbed, GuildMember } from "discord.js";
import { db } from '../../../../../../src/db/index';
import { CozyClient } from "../../../client/CozyClient";
import { Command } from "../Command";
import { Constants } from '../../../../../../src/utils/constants';

const { EmbedColors, TableNames } = Constants;
const { RED } = EmbedColors
const { COMMAND_CONFIGS } = TableNames;

export class CommandHandler {
  private db: Knex;
  private client: CozyClient;
  public onCooldown: Set<string>;
  public commands: Map<string, Command>;

  public constructor(client: CozyClient) {
    this.db = db;
    this.client = client;
  }

  public async register(command: Command) {
    try {
      const hasCommandConfig = await this.db.table(COMMAND_CONFIGS)
        .select('*')
        .where('id', command.id);

      if(!hasCommandConfig) {
        await this.db.table(COMMAND_CONFIGS).insert(command.configTableInsertObject);
      }
    } catch (err) {
      this.client.emit('error', err);  
    }
  }

  public async unregister(command: Command) {
    try {
      const hasCFG = await this.db.table(COMMAND_CONFIGS)
        .select('*')
        .where('id', command.id);

      if(!hasCFG) {
        await this.db.table(COMMAND_CONFIGS)
          .delete('*')
          .where('id', command.id);
      }
    } catch (err) {
      this.client.emit('error', err);
    }
  }

  // TODO: This
  // public edit(command: Command) {

  // }

  public validate(client: CozyClient, command: Command, message: Message, args: Array<any>): Promise<{ success: boolean, reason?: string }> {
    return new Promise((resolve, reject) => {
      const member = message.member;
      const clientMember = message.guild.me;
  
      if(!command.options.ignoreBots && message.member.id === client.user.id) {
        reject({ success: false });
      }
  
      if(command.requirements.ownerOnly && !client.owners.includes(member.id)) {
        reject({
          success: false,
          reason: 'Command is restricted to the owners'
        });
      }
  
      if(!member.hasPermission(command.requirements.userPerms)) {
        message.channel.send(this.missingPermissionsEmbed(member, command.requirements.userPerms));

        reject({
          success: false,
          reason: `User missing permissions`
        });
      }

      if(!clientMember.hasPermission(command.requirements.clientPerms)) {
        message.channel.send(this.missingPermissionsEmbed(clientMember, command.requirements.clientPerms));

        reject({
          success: false,
          reason: 'Client missing permissions'
        });
      }

      if(command.help.cooldown > 0) {
        if(this.onCooldown.has(command.id)) {
          message.channel.send(this.onCooldownEmbed(command.help.name));
  
          reject({
            success: false,
            reason: 'Command on cooldown'
          });
        }
    
        this.onCooldown.add(command.id);
  
        setTimeout(() => {
          this.onCooldown.delete(command.id);
        }, command.help.cooldown);  
      }

      resolve({ success: true });
    });
  }

  private missingPermissionsEmbed(member: GuildMember, neededPerms: Array<PermissionString>): MessageEmbed {
    const missing = member.permissions.missing(neededPerms)
      .map(perm => `${perm},`).join('\n');

    const embed = new MessageEmbed()
      .setDescription(`\`${missing}\``)
      .setColor(RED)
      .setAuthor(`${member.id === member.guild.me.id ? 'I' : 'You'} need the permissions below to use this command!`)

    return embed;
  }

  private onCooldownEmbed(name: string): MessageEmbed {
    const embed = new MessageEmbed()
      .setDescription(`The command ${name} is on cooldown!`)
      .setColor(RED);

    return embed;
  }
}
