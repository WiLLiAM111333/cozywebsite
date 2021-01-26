import { Message, PermissionString, MessageEmbed, GuildMember } from "discord.js";
import { db } from '../../../../../../src/db/index';
import { CozyClient } from "../../../client/CozyClient";
import { Command } from "../Command";
import { join } from 'path';
import { readdir, lstat } from 'fs/promises';
import { Constants } from '../../../../../../src/utils/constants';

const { EmbedColors, TableNames } = Constants;
const { RED } = EmbedColors

export class CommandHandler {
  private client: CozyClient;
  private commandPath: string;
  public onCooldown: Set<string>;
  public commands: Map<string, Command>;
  public prefix: string;

  public constructor(client: CozyClient) {
    this.client = client;
    this.onCooldown = new Set();
    this.commands = new Map();
    this.prefix = '.,.';
    this.commandPath = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'src',
      'bot',
      'commands'
    );

    this.loadCommands();
  }

  public validate(client: CozyClient, command: Command, message: Message): Promise<{ success: boolean, reason?: string }> {
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

  public setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  public hasCommand(command: string): boolean {
    return this.commands.has(command);
  }

  public execute(command: string, message: Message, args: Array<string>): void {
    const cmd = this.commands.get(command);
    
    if(this.validate(this.client, cmd, message)) {
      cmd.run(this.client, message, args)
    }
  }

  public loadCommands() {
    const run = async (dir: string, client: CozyClient): Promise<void> => {
      readdir(dir).then(files => {
        for(const file of files) {
          const next = join(dir, file);
         
          lstat(next).then(data => {
            if(data.isDirectory()) {
              run(next, client);
            } else {
              const Command = require(next).default;
              const command = new Command()

              client.commandHandler.commands.set(command.help.name, command);
            }
          }).catch(err => {
            this.handleError(err);
          });
        }
      }).catch(err => {
        this.handleError(err);
      });
    }

    run(this.commandPath, this.client);
  }

  private handleError(error: unknown): void {
    console.log(error);
  }
}
