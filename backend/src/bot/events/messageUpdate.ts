import { Message } from "discord.js";
import { CozyClient } from "../../../lib/discord/bot/client/CozyClient";

export const event = (client: CozyClient, oldMessage: Message, newMessage: Message): void => {
  if(newMessage && newMessage?.content) {
    client.editSnipes.set(newMessage.channel.id, {
      oldContent: oldMessage.content, 
      newContent: newMessage.content 
    });
  }
}
