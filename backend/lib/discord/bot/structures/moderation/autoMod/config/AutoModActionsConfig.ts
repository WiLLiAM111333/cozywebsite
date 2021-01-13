// This file is not cool and im changing it **eventually** lul

export interface AutoModActionsConfigOptions {
  enabled: boolean;
  ban?: boolean;
  kick?: boolean;
  mute?: boolean;
  gifBan?: boolean;
  emoteBan?: boolean;
  report: boolean; 
  deleteMessage?: boolean;
  changeNickname?: boolean;
  setNickname?: boolean;
  notify?: boolean;
}

export interface AutoModActionsConfig {
  zalgo: AutoModActionsConfigOptions;
  profanity: AutoModActionsConfigOptions;
  externalLink: AutoModActionsConfigOptions;
  repeatedText: AutoModActionsConfigOptions;
  capsSpam: AutoModActionsConfigOptions;
  emoteSpam: AutoModActionsConfigOptions;
  spoilerSpam: AutoModActionsConfigOptions;
  massPings: AutoModActionsConfigOptions;
  blacklistedLink: AutoModActionsConfigOptions;
  hoistUsername: AutoModActionsConfigOptions;
  hoistNickname: AutoModActionsConfigOptions;
  zalgoUsername: AutoModActionsConfigOptions;
  zalgoNickname: AutoModActionsConfigOptions;
}
