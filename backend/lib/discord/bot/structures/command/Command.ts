import Knex from "knex";
import { db } from '../../../../../src/db/index';
import { Message } from "discord.js";
import { CozyClient } from "../../client/CozyClient";
import { CommandConstructor } from "./CommandConstructor";
import { CommandHelp } from "./Help";
import { ICommand } from "./ICommand";
import { CommandRequirements } from "./Requirements";

export class Command implements ICommand {
  protected db: Knex;
  public requirements: CommandRequirements;
  public help: CommandHelp;

  public constructor(data: CommandConstructor) {
    const {
      args,
      name,
      ownerOnly,
      aliases,
      clientPerms,
      cooldown,
      description,
      userPerms
    } = data;

    this.requirements = { ownerOnly, clientPerms, userPerms };
    this.help = {
      args,
      name,
      aliases,
      cooldown,
      description
    }

    this.db = db;
  }

  public get tableInsertObject(): CommandConstructor {
    return {
      ...this.help, 
      ...this.requirements
    }
  }
}
