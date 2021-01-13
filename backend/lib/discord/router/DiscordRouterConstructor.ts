import { Client } from "discord.js";
import { RouterConstructor } from "../../server/router/RouterConstructor";

export interface DiscordRouterConstructor extends RouterConstructor {
  client: Client;
}
