export interface AutoModConfig {
  ignoredRoles: Array<string>;
  ignoredChannels: Array<string>;
  profanities: Array<RegExp>;
  blacklistedLinks: Array<string>;
  enabled: boolean;
  useProfanityFilter: boolean;
  useZalgoFilter: boolean;
  useCapsSpamFilter: boolean;
  useLinkFilter: boolean;
  useSpoilerSpamFilter: boolean;
  useMassPingFilter: boolean;
  useEmoteSpamFilter: boolean;
  useBlacklistedLinkFilter: boolean;
  useInviteLinkFilter: boolean;
}
