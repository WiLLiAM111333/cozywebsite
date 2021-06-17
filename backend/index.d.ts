import { User } from 'discord.js';
import { SuperArray } from './lib/dataStructures/superArray';
import { inspect, InspectOptionsStylized } from 'util';
import 'discord.js';
import 'express-session';
import './lib/dataStructures/superMap';
import './lib/dataStructures/superArray';
import '@types/node';
import 'util';

declare module "express-session" {
  interface SessionData {
    user: User
  }
}

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
    guildKickAdd: [GuildMember, string];
    guildMuteAdd: [GuildMember, string];
    guildMuteRemove: [GuildMember];
    guildReportAdd: [GuildMember, GuildMember, string];
    guildReportRemove: [GuildMember];
    guildWarnAdd: [GuildMember, string];
    guildWarnRemove: [GuildMember];
    guildGifBanAdd: [GuildMember, string];
    guildGifBanRemove: [GuildMember];
    guildEmoteBanAdd: [GuildMember, string];
    guildEmoteBanRemove: [GuildMember];
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

declare module 'ws' {
  export interface ServerOptions {
    heartBeatInterval: number;
  }
}


// declare class SuperMap<K, V> extends Map<K, V> {
//   private _array: SuperArray<V>;
//   private _keyArray: SuperArray<V>;
//   private _entryArray: SuperArray<[K, V]>;

//   public constructor(entries?: readonly (readonly [K, V])[] | Iterable<readonly [K, V]>);

//   public get [Symbol.species](): typeof SuperMap;
//   public [inspect.custom](depth: number, options: InspectOptionsStylized): string;

//   public override set(key: K, value: V): this;
//   public override delete(key : K): boolean;

//   public first(): V | undefined;
//   public firstKey(): K | undefined;
//   public firstEntry(): [K, V] | undefined;

//   public toArray(): Array<V>;
//   public toKeyArray(): Array<K>;
//   public toEntryArray(): Array<[K, V]>;

//   public last(): V | undefined;
//   public lastKey(): K | undefined;
//   public lastEntry(): [K, V] | undefined;

//   public random(): V | undefined;
//   public randomKey(): V | undefined;
//   public randomEntry(): [K, V] | undefined;

//   public shift(): V | undefined;
//   public shiftKey(): K | undefined;
//   public shiftEntry(): [K, V] | undefined;

//   public pop(): V | undefined;
//   public popKey(): K | undefined;
//   public popEntry(): [K, V] | undefined;

//   public concat(...values: Array<Map<K, V> | SuperMap<K, V> | [K, V]>): SuperMap<K, V>;

//   public every(fn: (value: V, key: K) => boolean): boolean;
//   public every(fn: (value: V, key: K, map: this) => boolean): boolean;
//   public every<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): boolean;
//   public every(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): boolean;

//   public filter(fn: (value: V, key: K) => boolean): SuperMap<K, V>;
//   public filter(fn: (value: V, key: K, map: this) => boolean): SuperMap<K, V>;
//   public filter<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): SuperMap<K, V>;
//   public filter(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): SuperMap<K, V>;

//   public find(fn: (value: V, key: K) => boolean): V | undefined;
//   public find(fn: (value: V, key: K, map: this) => boolean): V | undefined;
//   public find<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): V | undefined;
//   public find(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): V | undefined;

//   public findKey(fn: (value: V, key: K) => boolean): K | undefined;
//   public findKey(fn: (value: V, key: K, map: this) => boolean): K | undefined;
//   public findKey<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): K | undefined;
//   public findKey(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): K | undefined;

//   public findEntry(fn: (value: V, key: K) => boolean): [K, V] | undefined;
//   public findEntry(fn: (value: V, key: K, map: this) => boolean): [K, V] | undefined;
//   public findEntry<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): [K, V] | undefined;
//   public findEntry(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): [K, V] | undefined;

//   public some(fn: (value: V, key: K) => boolean): boolean;
//   public some<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): boolean;
//   public some(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): boolean;

//   public reduce<S>(fn: (accumualtor: S, value: V, key?: K, map?: this) => S, initialValue?: S): S;
//   private nullifyCacheArrays(): void;
// }
