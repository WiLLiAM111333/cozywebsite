import { Message, Snowflake } from "discord.js";
import { Zalgo } from "../zalgo";

// Very basic, will keep working on this

export class AutoModerator {
  private ignoredRoles: Array<Snowflake>;
  private ignoredChannels: Array<Snowflake>;
  private profanities: Array<RegExp>;
  private enabled: boolean;
  private useProfanityFilter: boolean;
  private useZalgoFilter: boolean;

  public constructor() {
    this.ignoredRoles = [];
    this.ignoredChannels = [];
    this.profanities = [];
    this.enabled = false;
    this.useProfanityFilter = false;
    this.useZalgoFilter = false;
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
}
