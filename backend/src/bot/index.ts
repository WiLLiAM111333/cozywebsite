import { CozyClient } from '../../lib/discord/bot/client/CozyClient';
import { join } from 'path';

export const client = new CozyClient({
  eventPath: join(__dirname, 'events')
});
