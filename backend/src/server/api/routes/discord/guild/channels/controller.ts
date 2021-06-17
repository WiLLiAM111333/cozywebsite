import { Request, Response } from 'express';
import { DiscordController } from '../../../../../../../lib/discord/controller/DiscordController';

export class GuildChannelController extends DiscordController {
  public constructor() {
    super();
  }

  public listChannelIDs(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const { id } = req.params;
        const guild = await this.client.guilds.fetch(id)

        if(guild) {
          res.status(200).json({ channels: guild.channels.cache.array() });
        } else {
          res.status(200).json({ message: `I am not in the server by the ID: \`${id}\``});
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  }

  public getByID(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const { guildID, channelID } = req.params;

        if(!super.verifySnowflake(guildID, channelID)) {
          res.status(400).json({ error: 'Invalid Discord Snowflake ID' });
        }
        
        const guild = await this.client.guilds.fetch(guildID);

        if(guild) {
          const channel = guild.channels.cache.get(channelID);

          if(channel) {
            res.status(200).json({ ...channel });
          } else {
            res.status(404).json({ message: `There is no channel by the id \`${channelID}\``});
          }
        } else {
          res.status(404).json({ message: `I am not in the server by the ID: \`${guildID}\``});
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    }
  }
}
