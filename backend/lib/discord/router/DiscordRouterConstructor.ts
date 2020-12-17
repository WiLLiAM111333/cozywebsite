import { Client } from "discord.js";
import { RouterConstructor } from "../../router/RouterConstructor";

export interface DiscordRouterConstructor extends RouterConstructor {
  client: Client;
}
