import { AutoMod } from "../AutoMod";
import { AutoModActionsConfig, AutoModActionsConfigOptions } from "./AutoModActionsConfig";

export class AutoModActionsManager {
  private autoMod: AutoMod;
  private config: AutoModActionsConfig | {};

  public constructor(autoMod: AutoMod) {
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
      this.autoMod.on<ActionStrings>(event, member => {
        const eventConfig: AutoModActionsConfigOptions = this.config[event];

        if(eventConfig && eventConfig.enabled) {
          if(eventConfig.deleteMessage) {
            console.log('Message should be deleted');
          }

          if(eventConfig.ban) {
            console.log('Member is supposed to be banned');
          } else if(eventConfig.kick) {
            console.log('Member is supposed to be kicked');
          } else if(eventConfig.emoteBan) {
            console.log('Member is supposed to get emote-banned');
          } 
          
          if(eventConfig.gifBan) {
            console.log('Member is supposed to be gif-banned');
          } 
          
          if(eventConfig.mute) {
            console.log('Member is supposed to be muted');
          } 
          
          if(eventConfig.report) {
            console.log('Member is supposed to be reported');
          }
        }
      });
    }
  }
}
