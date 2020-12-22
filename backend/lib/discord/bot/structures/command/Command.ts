import Knex from "knex";
import { db } from '../../../../../src/db/index';
import { CommandCFGTableInsertObject } from "./CommandCFGTableInsertObject";
import { CommandConstructor } from "./CommandConstructor";
import { CommandOptions } from "./CommandOptions";
import { CommandHelp } from "./CommandHelp";
import { ICommand } from "./ICommand";
import { CommandRequirements } from "./CommandRequirements";

export class Command implements ICommand {
  protected db: Knex;
  public id: string;
  public requirements: CommandRequirements;
  public help: CommandHelp;
  public options: CommandOptions;

  public constructor(data: CommandConstructor) {
    const {
      args,
      name,
      ownerOnly,
      aliases,
      clientPerms,
      cooldown,
      description,
      userPerms,
      ignoreBots
    } = data;

    this.requirements = {
      ownerOnly: ownerOnly || true,
      clientPerms: clientPerms || [
        'SEND_MESSAGES',
        'VIEW_CHANNEL',
        'ATTACH_FILES',
        'EMBED_LINKS',
        'MANAGE_MESSAGES',
      ],
      userPerms: userPerms || [
        'SEND_MESSAGES',
        'VIEW_CHANNEL',
        'ATTACH_FILES',
        'EMBED_LINKS'
      ],
    };
    this.options = { ignoreBots: ignoreBots || true }

    this.help = {
      args: args || [],
      name,
      aliases: aliases || [],
      cooldown: cooldown || 0,
      description: description || 'No description set'
    }

    this.db = db;
  }

  public get configTableInsertObject(): CommandCFGTableInsertObject {
    const id = this.id;
    const cooldown = this.help.cooldown;
    const ownerOnly = this.requirements.ownerOnly ? 1 : 0;
    const clientPerms = this.requirements.clientPerms.join(', ');
    const userPerms = this.requirements.userPerms.join(', ');

    return {
      id,
      cooldown,
      ownerOnly,
      clientPerms,
      userPerms    
    }
  }
}
