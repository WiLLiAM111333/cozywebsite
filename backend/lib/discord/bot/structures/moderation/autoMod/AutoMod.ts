import { Zalgo } from "../zalgo";
import { AutoModActionsManager } from "./actions/AutoModActionsManager";
import { AutoModConfig } from "./config/AutoModConfig";
import { AutoModConfigManager } from "./config/AutoModConfigManager";
import { AutoModEventHandler } from "./AutoModEventHandler";
import { 
  Channel, 
  DMChannel, 
  GuildMember, 
  Message, 
  MessageEmbed, 
  TextChannel
} from "discord.js";

// Very basic, will keep working on this
// configManager is only for internal use and communicates with this class through 2 events
// I keep all the methods other than the handleSomething methods private to keep it abstracted away from the dashboard itself

export class AutoMod extends AutoModEventHandler {
  private config: AutoModConfig;
  private hoistRegex: RegExp;

  public constructor() {
    super();

    this.hoistRegex = /\?|!|#|%|&|\/|\(|\)|=|`|`|@|\[|\]|\\|<|>|,|\.|-|_|'|\*|\^/

    new AutoModConfigManager(this);
    new AutoModActionsManager(this);

    this.on('configCreate', config => this.config = config);
    this.on('configUpdate', config => this.config = config);
  }

  private verify(member: GuildMember, channel: Channel): boolean {
    if(!this.config.enabled) {
      return false;
    }

    for(const id of this.config.ignoredRoles) {
      if(member.roles.cache.has(id)) {
        return false;
      }
    }

    if(this.config.ignoredChannels.includes(channel.id)) {
      return false;
    }        

    return true;
  }

  private isProfanity(message: Message) {
    if(this.verify(message.member, message.channel) && this.config.useProfanityFilter) {
      for(const profanity of this.config.profanities) {
        if(message.content.toLowerCase().match(profanity)) {
          return true;
        }
      }
    }

    return false;
  }

  // Unused for now
  private getProfanity(args: Array<string>): string {
    for(const word of args) {
      for(const profanity of this.config.profanities) {
        if(word.match(profanity)) {
          return word;
        }
      }
    }
  }

  private isZalgo(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useZalgoFilter) {
      const content = message.content;
      return new Zalgo(content).isZalgo();
    }

    return false;
  }

  private isCapsSpam(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useCapsSpamFilter) {
      if(message.content.length < 10) {
        return false;
      }
  
      const upperCaseMatch = message.content.match(/[A-Z]+/g) || [];
      const lowerCaseMatch = message.content.match(/[a-z]+/g) || [];
  
      if(!upperCaseMatch.length) {
        return false;
      }
  
      let upperCaseStr = '';
      for(const match of upperCaseMatch) {
        for(const char of match) {
          upperCaseStr += char;
        }
      }
  
      let lowerCaseStr = '';
      for(const match of lowerCaseMatch) {
        for(const char of match) {
          lowerCaseStr += char;
        }
      }
  
      if(upperCaseStr.length > lowerCaseStr.length) {
        return true;
      }
  
      if(upperCaseStr.length >= message.content.length / 3) {
        return true;
      }
    }

    return false;
  }

  private isExternalLink(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useLinkFilter) {
      const link = message.content.match(/https:\/\//);
      
      if(link && link.input) {
        return !(/^https:\/\/discord\.gg\/[A-Za-z0-9]+$/.test(link.input));
      }

      return false;
    }

    return false;
  }

  private isSpoilerSpam(message: Message) {
    if(this.verify(message.member, message.channel) && this.config.useSpoilerSpamFilter) {
      const spoilerMatch = message.content
        .replace(/\s+/, ' ')
        .match(/\|\|\s?.+\s?\|\|/);
  
      if(spoilerMatch) {
        return spoilerMatch.input.split(/\|\|\s?\|\|/g).length > 15;
      }
    }

    return false;
  }

  private isMassPing(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useMassPingFilter) {
      const limit = 4;
  
      return (
        (message.mentions.members && message.mentions.members.size > limit) 
          || (message.mentions.roles && message.mentions.roles.size > limit) 
          || (message.mentions.users && message.mentions.users.size > limit)
      );
    }

    return false;
  }

  private isEmoteSpam(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useEmoteSpamFilter) {
      const emoteMatch = message.content.match(/<a?:(\w+):(\d+)>/g);  
      return (emoteMatch && emoteMatch.length > 4);
    }

    return false;
  }

  private isBlacklistedLink(message: Message) {
    if(this.verify(message.member, message.channel) && this.config.useBlacklistedLinkFilter) {
      for(const arg of message.content.split(/ +/)) {
        if(this.config.blacklistedLinks.includes(arg)) {
          return true;
        }
      }
    }

    return false;
  }
  
  // Not sure what to think of this so far, might change in the future
  private async notifyMember(member: GuildMember, msg: string): Promise<void> {
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

  private checkNickname(member: GuildMember): void {
    if(member.nickname) {
      const zalgo = new Zalgo(member.nickname);
  
      if(zalgo.isZalgo()) {
        member.setNickname('Change nickname');
        this.notifyMember(member, 'Please change your nickname! It includes Zalgo');
      }

      if(member.nickname[0].match(this.hoistRegex)) {
        member.setNickname('Change nickname');
        this.notifyMember(member, 'Please change your nickname! It includes a hoisting character');
      }
    }
  }

  private checkUsername(member: GuildMember): void {
    const username = member.user.username;
    const zalgo = new Zalgo(username);
  
    if(zalgo.isZalgo()) {
      member.setNickname('Change nickname');
      this.notifyMember(member, 'Please change your nickname! It includes Zalgo');
    }

    if(username[0].match(this.hoistRegex)) {
      member.setNickname('Change nickname');
      this.notifyMember(member, 'Please change your nickname! It includes a hoisting character');
    }
  }


  public handleMessage(message: Message): void {
    if(this.isProfanity(message)) {
      this.emit('profanity', message.member);
    }
  
    if(this.isZalgo(message)) {
      this.emit('zalgo', message.member);
    }
  
    if(this.isCapsSpam(message)) {
      this.emit('capsSpam', message.member);
    }
  
    if(this.isExternalLink(message)) {
      this.emit('externalLink', message.member);
    }
  
    if(this.isSpoilerSpam(message)) {
      this.emit('spoilerSpam', message.member);
    }
  
    if(this.isMassPing(message)) {
      this.emit('massPings', message.member);
    }
  
    if(this.isEmoteSpam(message)) {
      this.emit('emoteSpam', message.member);
    }
  
    if(this.isBlacklistedLink(message)) {
      this.emit('blacklistedLink', message.member);
    }
  }

  // Integrate AutoModActionsManager like above
  public handleGuildMemberAdd(member: GuildMember): void {
    const username = member.user.username;
    const zalgo = new Zalgo(username);

    this.checkNickname(member);
    this.checkUsername(member);
  }

  // Integrate AutoModActionsManager like in the handleMessage method
  public handleGuildMemberUpdate(oldMember: GuildMember, newMember: GuildMember): void {
    const oldUser = oldMember.user;
    const newUser = newMember.user;

    if(
      (!oldMember.nickname && newMember.nickname) || 
      ((oldMember.nickname && newMember.nickname) && (oldMember.nickname !== newMember.nickname))
    ) {
      this.checkNickname(newMember);
    } 

    if(oldUser.username !== newUser.username) {
      this.checkUsername(newMember);
    }
  }
}
