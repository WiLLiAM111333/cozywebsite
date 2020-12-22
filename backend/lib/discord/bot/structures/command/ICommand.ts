import { CommandHelp } from "./CommandHelp";
import { CommandRequirements } from "./CommandRequirements";

export interface ICommand {
  requirements: CommandRequirements;
  help: CommandHelp; 
}
