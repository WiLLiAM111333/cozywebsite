import { Zalgo } from "../zalgo";
import { AutoModActionsManager } from "./actions/AutoModActionsManager";
import { AutoModConfig } from "./config/AutoModConfig";
import { AutoModConfigManager } from "./config/AutoModConfigManager";
import { AutoModEventHandler } from "./AutoModEventHandler";
import { BoxDrawing } from "../boxDrawing";
import { Channel, GuildMember, Message } from "discord.js";
import { CozyClient } from "../../../client/CozyClient";

// Very basic, will keep working on this
// configManager is only for internal use and communicates with this class through 2 events
// I keep all the methods other than the handleSomething methods private to keep it abstracted away from the dashboard itself

export class AutoMod extends AutoModEventHandler {
  private config: AutoModConfig;
  private hoistRegex: RegExp;
  
  public constructor(client: CozyClient) {
    super();

    this.hoistRegex = /\?|!|#|%|&|\/|\(|\)|=|`|`|@|\[|\]|\\|<|>|,|\.|-|_|'|\*|\^/
    
    new AutoModConfigManager(this);
    new AutoModActionsManager(this, client);

    this.on('configCreate', config => this.config = config);
    this.on('configUpdate', config => this.config = config);
  }

  private verify(member: GuildMember, channel?: Channel): boolean {
    if(!this.config.enabled) {
      return false;
    }

    if(channel && this.config.ignoredChannels.includes(channel.id)) {
      return false;
    }

    for(const id of this.config.ignoredRoles) {
      if(member.roles.cache.has(id)) {
        return false;
      }
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

  private isZalgo(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useZalgoFilter) {
      const content = message.content;
      return new Zalgo(content).isZalgo()
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

  // Enable the commentented out config option once its created
  private isBoxDrawing(message: Message) {
    return (
      this.verify(message.member, message.channel) 
        && this.config.useBoxDrawingFilter
        && new BoxDrawing().isBoxDrawing(message.content)
    )
  }

  private checkNickname(member: GuildMember): void {
    if(member.nickname) {
      const zalgo = new Zalgo(member.nickname);
  
      if(zalgo.isZalgo()) {
        this.emit('zalgoNickname', member);
      }

      if(member.nickname[0].match(this.hoistRegex)) {
        this.emit('hoistNickname', member);
      }
    }
  }

  private checkUsername(member: GuildMember): void {
    const username = member.user.username;
    const zalgo = new Zalgo(username);
  
    if(zalgo.isZalgo()) {
      this.emit('zalgoUsername', member);
    }

    if(username[0].match(this.hoistRegex)) {
      this.emit('hoistUsername', member)
    }
  }


  public handleMessage(message: Message): void {
    if(this.isBoxDrawing(message)) {
      this.emit('boxDrawing', message.member, message);
    }

    if(this.isProfanity(message)) {
      this.emit('profanity', message.member, message);
    }
  
    if(this.isZalgo(message)) {
      this.emit('zalgo', message.member, message);
    }
  
    if(this.isCapsSpam(message)) {
      this.emit('capsSpam', message.member, message);
    }
  
    if(this.isExternalLink(message)) {
      this.emit('externalLink', message.member, message);
    }
  
    if(this.isSpoilerSpam(message)) {
      this.emit('spoilerSpam', message.member, message);
    }
  
    if(this.isMassPing(message)) {
      this.emit('massPings', message.member, message);
    }
  
    if(this.isEmoteSpam(message)) {
      this.emit('emoteSpam', message.member, message);
    }
  
    if(this.isBlacklistedLink(message)) {
      this.emit('blacklistedLink', message.member, message);
    }
  }

  public handleGuildMemberAdd(member: GuildMember): void {
    this.checkNickname(member);
    this.checkUsername(member);
  }

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
