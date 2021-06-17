import { GuildMember } from "discord.js";
import { CozyClient } from "../../../lib/discord/bot/client/CozyClient";

export const event = (client: CozyClient, member: GuildMember): void => {
  client.autoMod.handleGuildMemberAdd(member);
}
