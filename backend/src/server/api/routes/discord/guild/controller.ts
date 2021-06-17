import { AllowedImageFormat, ImageSize } from 'discord.js';
import { Request, Response } from 'express';
import { DiscordController } from '../../../../../../lib/discord/controller/DiscordController';

export class GuildController extends DiscordController  {
  public constructor() {
    super();
  }

  public getAll(): (req: Request, res: Response) => void {
    return (req, res) => {
      res.status(200).json(this.client.guilds.cache.array());
    }
  }

  public getByID(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      const { id } = req.params;
      const guild = await this.client.guilds.fetch(id)

      if(!guild) {
        res.status(404).json({
          message: 'No guild found',
          givenID: id
        });
      } else {
        res.status(200).json({ guild });
      }
    }
  }

  public getBanner(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const { id } = req.params;
        const guild = await this.client.guilds.fetch(id, true, true);

        if(guild) {
          const banner = guild?.bannerURL({
            format: <AllowedImageFormat>(req.params?.format) ?? 'jpg',
            size: <ImageSize>(parseInt(req.params?.size, 2)) ?? 1024
          });

          if(banner) {
            res.status(200).json({ banner });
          } else {
            if(guild.premiumTier < 2) {
              res.status(204).json({ message: 'A guild has to be at least nitro level 2 to unlock banners!' });
            } else {
              res.status(204).json({ message: 'This guild has not set a banner yet!' });
            }
          }
        } else {
          res.status(204).json({ message: `I am not in the server by the ID: \`${id}\``});
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  }

  public getAllChannels(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const { id } = req.params;
        const guild = await this.client.guilds.fetch(id, true, true);

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

  public getAllEmotes(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const { id } = req.params;
        const guild = await this.client.guilds.fetch(id, true, true);

        if(guild) {
          res.status(200).json({ emotes: guild.emojis.cache.array() });
        } else {
          res.status(200).json({ message: `I am not in the server by the ID: \`${id}\`` });
        }
      } catch (error) {
        res.status(500).json({ error });
        console.error(error);
      }
    }
  }
}
