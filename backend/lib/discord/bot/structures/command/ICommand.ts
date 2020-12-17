import { Message } from "discord.js";
import { CozyClient } from "../../client/CozyClient";
import { CommandHelp } from "./Help";
import { CommandRequirements } from "./Requirements";

export interface ICommand {
  requirements: CommandRequirements;
  help: CommandHelp; 
}
