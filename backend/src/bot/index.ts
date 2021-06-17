import { CozyClient } from '../../lib/discord/bot/client/CozyClient';
import { join } from 'path';

export const client = new CozyClient({
  eventPath: join(__dirname, 'events'),
  ws: {
    intents: [
      'GUILDS',
      'GUILD_BANS',
      'GUILD_EMOJIS',
      'GUILD_INTEGRATIONS',
      'GUILD_INVITES',
      'GUILD_MEMBERS',
      'GUILD_MESSAGES',
      'GUILD_MESSAGE_REACTIONS',
      'GUILD_PRESENCES',
      'GUILD_VOICE_STATES',
      'GUILD_WEBHOOKS'
    ]
  }
});
