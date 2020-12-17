import { Client } from "discord.js";
import { Controller } from "../../controller/Controller";

export abstract class DiscordController extends Controller {
  protected client: Client;
}
