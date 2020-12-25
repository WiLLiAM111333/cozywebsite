import { Channel, GuildMember, Message } from "discord.js";
import { Zalgo } from "../zalgo";
import { AutoModActionsManager } from "./AutoModActionsManager";
import { AutoModConfig } from "./AutoModConfig";
import { AutoModConfigManager } from "./AutoModConfigManager";
import { AutoModEventHandler } from "./AutoModEventHandler";

// Very basic, will keep working on this
// configManager is only for internal use and communicates with this class through 2 events

export class AutoMod extends AutoModEventHandler {
  private actionsManager: AutoModActionsManager;
  private configManager: AutoModConfigManager;
  private config: AutoModConfig;

  public constructor() {
    super();
    
    this.actionsManager = new AutoModActionsManager();
    this.configManager = new AutoModConfigManager(this);

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

  public isProfanity(message: Message) {
    if(this.verify(message.member, message.channel) && this.config.useProfanityFilter) {
      for(const profanity of this.config.profanities) {
        if(message.content.toLowerCase().match(profanity)) {
          return true;
        }
      }
    }

    return false;
  }

  public getProfanity(args: Array<string>): string {
    for(const word of args) {
      for(const profanity of this.config.profanities) {
        if(word.match(profanity)) {
          return word;
        }
      }
    }
  }

  public isZalgo(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useZalgoFilter) {
      const content = message.content;
      return new Zalgo(content).isZalgo();
    }

    return false;
  }

  public isCapsSpam(message: Message): boolean {
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

  public isExternalLink(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useLinkFilter) {
      const link = message.content.match(/https:\/\//);
      
      if(link && link.input) {
        return !(/^https:\/\/discord\.gg\/[A-Za-z0-9]+$/.test(link.input));
      }

      return false;
    }

    return false;
  }

  public isInviteLink(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useInviteLinkFilter) {
      return /https:\/\/discord\.gg\/[A-Za-z0-9]+/.test(message.content);
    }

    return false;
  }

  public isSpoilerSpam(message: Message) {
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

  public isMassPing(message: Message): boolean {
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

  public isEmoteSpam(message: Message): boolean {
    if(this.verify(message.member, message.channel) && this.config.useEmoteSpamFilter) {
      const emoteMatch = message.content.match(/<a?:(\w+):(\d+)>/g);  
      return (emoteMatch && emoteMatch.length > 4);
    }

    return false;
  }

  public isBlacklistedLink(message: Message) {
    if(this.verify(message.member, message.channel) && this.config.useBlacklistedLinkFilter) {
      for(const arg of message.content.split(/ +/)) {
        if(this.config.blacklistedLinks.includes(arg)) {
          return true;
        }
      }
    }

    return false;
  }
}
