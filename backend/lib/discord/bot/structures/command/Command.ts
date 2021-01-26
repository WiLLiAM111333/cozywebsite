import Knex from "knex";
import { db } from '../../../../../src/db/index';
import { CommandConstructor } from "./CommandConstructor";
import { CommandOptions } from "./CommandOptions";
import { CommandHelp } from "./CommandHelp";
import { ICommand } from "./ICommand";
import { CommandRequirements } from "./CommandRequirements";
import { CozyClient } from "../../client/CozyClient";
import { Message } from "discord.js";

export abstract class Command implements ICommand {
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
      clientPerms: clientPerms ? clientPerms : [
        'SEND_MESSAGES',
        'VIEW_CHANNEL',
        'ATTACH_FILES',
        'EMBED_LINKS',
        'MANAGE_MESSAGES',
      ],
      userPerms: userPerms ? userPerms : [
        'SEND_MESSAGES',
        'VIEW_CHANNEL',
        'ATTACH_FILES',
        'EMBED_LINKS'
      ],
    };
    this.options = { ignoreBots: ignoreBots || true }

    this.help = {
      args: args ? args : [],
      name,
      aliases: aliases ? aliases : [],
      cooldown: cooldown ? cooldown : 0,
      description: description ? description : 'No description set'
    }

    this.db = db;
  }

  public abstract run(client: CozyClient, message: Message, args: Array<string>): void | Promise<void>;
}
