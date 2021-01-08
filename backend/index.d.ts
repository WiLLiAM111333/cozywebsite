declare module 'discord.js' {
  interface ClientEvents {
    channelCreate: [Channel];
    channelDelete: [Channel | PartialDMChannel];
    channelPinsUpdate: [Channel | PartialDMChannel, Date];
    channelUpdate: [Channel, Channel];
    error: [Error];
    debug: [string];
    warn: [string];
    disconnect: [any, number];
    emojiCreate: [GuildEmoji];
    emojiDelete: [GuildEmoji];
    emojiUpdate: [GuildEmoji, GuildEmoji];
    guildBanAdd: [Guild, User];
    guildBanRemove: [Guild, User];
    guildKickAdd: [GuildMember];
    guildKickRemove: [GuildMember];
    guildCreate: [Guild];
    guildDelete: [Guild];
    guildUnavailable: [Guild];
    guildIntegrationsUpdate: [Guild];
    guildMemberAdd: [GuildMember];
    guildMemberAvailable: [GuildMember | PartialGuildMember];
    guildMemberRemove: [GuildMember | PartialGuildMember];
    guildMembersChunk: [
      Collection<Snowflake, GuildMember>,
      Guild,
      { count: number; index: number; nonce: string | undefined },
    ];
    guildMemberSpeaking: [GuildMember | PartialGuildMember, Readonly<Speaking>];
    guildMemberUpdate: [GuildMember | PartialGuildMember, GuildMember];
    guildUpdate: [Guild, Guild];
    inviteCreate: [Invite];
    inviteDelete: [Invite];
    message: [Message];
    messageUpdate: [Message | PartialMessage, Message | PartialMessage];
    messageDelete: [Message | PartialMessage];
    messageDeleteBulk: [Collection<Snowflake, Message | PartialMessage>];
    messageReactionAdd: [MessageReaction, User | PartialUser];
    messageReactionRemove: [MessageReaction, User | PartialUser];
    messageReactionRemoveAll: [Message | PartialMessage];
    messageReactionRemoveEmoji: [MessageReaction];
    presenceUpdate: [Presence | undefined, Presence];
    rateLimit: [RateLimitData];
    ready: [];
    invalidated: [];
    roleCreate: [Role];
    roleDelete: [Role];
    roleUpdate: [Role, Role];
    typingStart: [Channel | PartialDMChannel, User | PartialUser];
    userUpdate: [User | PartialUser, User];
    voiceStateUpdate: [VoiceState, VoiceState];
    webhookUpdate: [TextChannel];
    shardDisconnect: [CloseEvent, number];
    shardError: [Error, number];
    shardReady: [number, Set<Snowflake> | undefined];
    shardReconnecting: [number];
    shardResume: [number, number];
  }

  interface ClientOptions {
    shards?: number | number[] | 'auto';
    shardCount?: number;
    messageCacheMaxSize?: number;
    messageCacheLifetime?: number;
    messageSweepInterval?: number;
    messageEditHistoryMaxSize?: number;
    fetchAllMembers?: boolean;
    disableMentions?: 'none' | 'all' | 'everyone';
    allowedMentions?: MessageMentionOptions;
    partials?: PartialTypes[];
    restWsBridgeTimeout?: number;
    restTimeOffset?: number;
    restRequestTimeout?: number;
    restSweepInterval?: number;
    retryLimit?: number;
    presence?: PresenceData;
    ws?: WebSocketOptions;
    http?: HTTPOptions;
    eventPath: string;
  }
}
