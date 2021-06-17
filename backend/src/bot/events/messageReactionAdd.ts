import { MessageReaction, User } from "discord.js";
import { CozyClient } from "../../../lib";

export const event = (client: CozyClient, reaction: MessageReaction, user: User): void => {
  // client.starBoardManager.handleReactionAdd(reaction, user);
}
