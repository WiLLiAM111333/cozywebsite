import { CozyClient } from "../../../../client/CozyClient";
import { Moderation } from "../../Moderation";
import { AutoMod } from "../AutoMod";
import { AutoModActionsConfig, AutoModActionsConfigOptions } from "../config/AutoModActionsConfig";
import { GuildMember, Message } from "discord.js";


/**
 * TODO
 * * Integrate moderation
 * * Test
 * * Hope for the best
 */
export class AutoModActionsManager {
  private autoMod: AutoMod;
  private config: AutoModActionsConfig | {};
  private moderation: Moderation;

  public constructor(autoMod: AutoMod, client: CozyClient) {
    this.moderation = new Moderation(client);

    this.autoMod = autoMod;
    this.config = {}

    this.init();
  } 

  private init(): void {
    this.autoMod.on('actionsConfigCreate', config => this.config = config);
    this.autoMod.on('actionsConfigUpdate', config => this.config = config);

    const eventArr: Array<ActionStrings> = [
      'blacklistedLink', 
      'capsSpam',
      'emoteSpam',
      'externalLink',
      'massPings',
      'profanity',
      'repeatedText',
      'spoilerSpam',
      'zalgo',
      'hoistUsername',
      'hoistNickname'
    ]; 

    for(const event of eventArr) {
      this.autoMod.on<ActionStrings>(event, (member: GuildMember, message?: Message) => {
        const eventConfig: AutoModActionsConfigOptions = this.config[event];
        console.log(event);

        if(eventConfig && eventConfig.notify) {
          console.log('Member is supposed to be notified');
        }
        
        if(eventConfig && eventConfig.enabled) {
          if('deleteMessage' in eventConfig && eventConfig.deleteMessage) {
            message.delete();
          }

          if('ban' in eventConfig && eventConfig.ban) {
            console.log('Member is supposed to be banned');
          } else if('kick' in eventConfig && eventConfig.kick) {
            console.log('Member is supposed to be kicked');
          } else if('emoteBan' in eventConfig && eventConfig.emoteBan) {
            console.log('Member is supposed to get emote-banned');
          }

          if('changeNickname' in eventConfig && eventConfig.changeNickname) {
            console.log('Supposed to change the members\' nickname');
          }

          if('setNickname' in eventConfig && eventConfig.setNickname) {
            console.log('Supposed to set a nickname on the member');
          }
          
          if('gifBan' in eventConfig && eventConfig.gifBan) {
            console.log('Member is supposed to be gif-banned');
          } 
          
          if('mute' in eventConfig && eventConfig.mute) {
            console.log('Member is supposed to be muted');
          } 
          
          if('report' in eventConfig && eventConfig.report) {
            console.log('Member is supposed to be reported');
          }
        }
      });
    }
  }
}
