interface ConfigOptions {
  enabled: boolean;
  ban: boolean;
  kick: boolean;
  mute: boolean;
  gifBan: boolean;
  emoteBan: boolean;
  report: boolean; 
}

export interface AutoModActionsConfig {
  zalgo: ConfigOptions;
  profanity: ConfigOptions;
  externalLink: ConfigOptions;
  repeatedText: ConfigOptions;
  capsSpam: ConfigOptions;
  emoteSpam: ConfigOptions;
  spoilerSpam: ConfigOptions;
  massPings: ConfigOptions;
  blacklistedLink: ConfigOptions;
}
