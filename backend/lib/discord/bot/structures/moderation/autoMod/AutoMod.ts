import { Message, Snowflake } from "discord.js";
import { Zalgo } from "../zalgo";
import { AutoModEventHandler } from "./AutoModEventHandler";

// Very basic, will keep working on this

export class AutoMod extends AutoModEventHandler {
  private ignoredRoles: Array<Snowflake>;
  private ignoredChannels: Array<Snowflake>;
  private profanities: Array<RegExp>;
  private blacklistedLinks: Set<string>;
  private enabled: boolean;
  private useProfanityFilter: boolean;
  private useZalgoFilter: boolean;
  private useCapsSpamFilter: boolean;
  private useLinkFilter: boolean;
  private useSpoilerSpamFilter: boolean;
  private useMassPingFilter: boolean;
  private useEmoteSpamFilter: boolean;
  private useBlacklistedLinkFilter: boolean;

  public constructor() {
    super();
    
    // Make sure all of this comes from a config table later.
    // A static creation of empty data like this will cause resets
    // in the config when the bot restarts or whatever.
    this.ignoredRoles = [];
    this.ignoredChannels = [];
    this.profanities = [];
    this.blacklistedLinks = new Set();
    this.enabled = true;
    this.useProfanityFilter = true;
    this.useZalgoFilter = true;
    this.useCapsSpamFilter = true;
    this.useLinkFilter = true;
    this.useSpoilerSpamFilter = true;
    this.useMassPingFilter = true;
    this.useEmoteSpamFilter = true;
    this.useBlacklistedLinkFilter = true;
  }

  public isProfanity(message: Message) {
    if(this.enabled && this.useProfanityFilter && this.ignoredChannels.includes(message.channel.id)) {
      for(const role of this.ignoredRoles) {
        if(message.member.roles.cache.has(role)) {
          return false;
        }
      }
  
      for(const profanity of this.profanities) {
        if(message.content.toLowerCase().match(profanity)) {
          return true;
        }
      }
    }

    return false;
  }

  public getProfanity(args: Array<string>): string {
    for(const word of args) {
      for(const profanity of this.profanities) {
        if(word.match(profanity)) {
          return word;
        }
      }
    }
  }

  public isZalgo(message: Message) {
    if(this.enabled && this.useZalgoFilter && !this.ignoredChannels.includes(message.channel.id)) {
      const content = message.content;
  
      for(const role of this.ignoredRoles) {
        if(message.member.roles.cache.has(role)) {
          return false;
        }
      }
  
      return new Zalgo(content).isZalgo();
    }

    return false;
  }

  public isCapsSpam(message: Message): boolean {
    if(this.enabled && this.useCapsSpamFilter && !this.ignoredChannels.includes(message.channel.id)) {
      for(const role of this.ignoredRoles) {
        if(message.member.roles.cache.has(role)) {
          return false;
        }
      }

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
    if(this.enabled && this.useLinkFilter && !this.ignoredChannels.includes(message.channel.id)) {
      for(const role of this.ignoredRoles) {
        if(message.member.roles.cache.has(role)) {
          return false;
        }
      }

      const link = message.content.match(/https:\/\//);
      
      if(link && link.input) {
        return !(/^https:\/\/discord\.gg\/[A-Za-z0-9]+$/.test(link.input));
      }

      return false;
    }

    return false;
  }

  public isSpoilerSpam(message: Message) {
    if(this.enabled && this.useSpoilerSpamFilter && !this.ignoredChannels.includes(message.channel.id)) {
      for(const role of this.ignoredRoles) {
        if(message.member.roles.cache.has(role)) {
          return false;
        }
      }
  
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
    if(this.enabled && this.useMassPingFilter && !this.ignoredChannels.includes(message.channel.id)) {
      for(const role of this.ignoredRoles) {
        if(message.member.roles.cache.has(role)) {
          return false;
        }
      }

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
    if(this.enabled && this.useEmoteSpamFilter && !this.ignoredChannels.includes(message.channel.id)) {
      for(const role of this.ignoredRoles) {
        if(message.member.roles.cache.has(role)) {
          return false;
        }
      }

      const emoteMatch = message.content.match(/<a?:(\w+):(\d+)>/g);  
      return (emoteMatch && emoteMatch.map(emote => emote.replace(/<a?|:|>|\d/g, '')).length > 4);
    }

    return false;
  }

  public isBlacklistedLink(message: Message) {
    if(this.enabled && this.useBlacklistedLinkFilter && !this.ignoredRoles.includes(message.channel.id)) {
      for(const arg of message.content.split(/ +/)) {
        if(this.blacklistedLinks.has(arg)) {
          return true;
        }
      }
    }

    return false;
  }
}
