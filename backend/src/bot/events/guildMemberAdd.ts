import { GuildMember, MessageEmbed, DMChannel, TextChannel } from "discord.js";
import { Zalgo } from "../../../lib/discord/bot/structures/moderation/zalgo";

const notifyMember = async (member: GuildMember, msg: string): Promise<void> => {
  let channel: DMChannel | TextChannel;

  const embed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true || false }))
    .setDescription(`Hello, ${member.user.username}! I have been tasked with sending you this message:\n${msg}`)
    .setColor('#00d111')
    .setThumbnail(member.guild.iconURL({ dynamic: true || false }))

  try {
    channel = await member.createDM(true);
    await channel.send(embed)
  } catch (err) {
    if(err.code === 50007) {
      try {
        channel = member.guild.systemChannel;
        await channel.send(member.user.toString(), { embed });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(err);
    }
  }
}

export const event = (member: GuildMember): void => {
  const username = member.user.username;
  const zalgo = new Zalgo(username);

  if(zalgo.isZalgo()) {
    member.setNickname('Change nickname');
    notifyMember(member, 'Please change your nickname! It includes Zalgo');
  }

  const hoistRegex = /\?|!|#|%|&|\/|\(|\)|=|`|`|@|\[|\]|\\|<|>|,|\.|-|_|'|\*|\^/
  if(username[0].match(hoistRegex) || member.nickname && member.nickname[0].match(hoistRegex)) {
    member.setNickname('Change nickname');
    notifyMember(member, 'Please change your nickname! It includes a hoisting character');
  }
}
