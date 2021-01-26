import { Message } from "discord.js";
import { CozyClient } from "../../../lib/discord/bot/client/CozyClient";

export const event = (client: CozyClient, message: Message): void => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author
  });
}
