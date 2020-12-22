import { Message, Snowflake } from "discord.js";
import { Zalgo } from "../zalgo";
import { AutoModEventHandler } from "./AutoModEventHandler";

// Very basic, will keep working on this

export class AutoMod extends AutoModEventHandler {
  private ignoredRoles: Array<Snowflake>;
  private ignoredChannels: Array<Snowflake>;
  private profanities: Array<RegExp>;
  private enabled: boolean;
  private useProfanityFilter: boolean;
  private useZalgoFilter: boolean;

  public constructor() {
    super();
    
    // Make sure all of this comes from a config table later.
    // A static creation of empty data like this will cause resets
    // in the config when the bot restarts or whatever.
    this.ignoredRoles = [];
    this.ignoredChannels = [];
    this.profanities = [];
    this.enabled = true;
    this.useProfanityFilter = true;
    this.useZalgoFilter = true;
  }

  public isProfanity(message: Message) {
    if(!this.enabled || !this.useProfanityFilter) {
      return false;
    }

    for(const role of this.ignoredRoles) {
      if(message.member.roles.cache.has(role)) {
        return false;
      }
    }

    if(this.ignoredChannels.includes(message.channel.id)) {
      return false;
    }

    for(const profanity of this.profanities) {
      if(message.content.toLowerCase().match(profanity)) {
        return true;
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
    if(!this.enabled || this.useZalgoFilter) {
      const content = message.content;
  
      for(const role of this.ignoredRoles) {
        if(message.member.roles.cache.has(role)) {
          return false;
        }
      }
  
      return (
        !this.ignoredChannels.includes(message.channel.id) 
          && new Zalgo(content).isZalgo()
      );
    }
  }

  public isCapsSpam(message: Message): boolean {
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

    return false;
  }

  public isExternalLink(message: Message): boolean {
    const link = message.content.match(/https:\/\//);

    if(link && link.input) {
      return !(/^https:\/\/discord\.gg\/[A-Za-z0-9]+$/.test(link.input));
    } else return false;
  }

  public isSpoilerSpam(message: Message) {
    const spoilerMatch = message.content
      .replace(/\s+/, ' ')
      .match(/\|\|\s?.+\s?\|\|/);

    if(spoilerMatch) {
      return spoilerMatch.input.split(/\|\|\s?\|\|/g).length > 15;
    }

    return false;
  }

  public isMassPing(message: Message) {
    const limit = 4;

    return (
      (message.mentions.members && message.mentions.members.size > limit) 
        || (message.mentions.roles && message.mentions.roles.size > limit) 
        || (message.mentions.users && message.mentions.users.size > limit)
    );
  }
}
