import { Request, Response } from 'express';
import { DiscordController } from "../../../../../../../lib/discord/controller/DiscordController";

export class GuildEmoteController extends DiscordController {
  public constructor() {
    super();
  }

  public listEmoteIDs(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const { id } = req.params;
        const guild = await this.client.guilds.fetch(id);

        if(!super.verifySnowflake(id)) {
          res.status(400).json({ error: 'Invalid Discord Snowflake ID' });
          return;
        }

        if(guild) {
          res.status(200).json({ emotes: guild.emojis.cache.array() });
        } else {
          res.status(200).json({ message: `I am not in the server by the ID: \`${id}\``});
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    }
  }

  public getByID(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const { guildID, emoteID } = req.params;

        if(!super.verifySnowflake(guildID, emoteID)) {
          res.status(400).json({ error: 'Invalid Discord Snowflake ID' });
          return;
        }
        
        const guild = await this.client.guilds.fetch(guildID);

        if(guild) {
          const emote = guild.emojis.cache.get(emoteID);

          if(emote) {
            res.status(200).json({ ...emote });
          } else {
            res.status(404).json({ message: `There is no emote by the id \`${emoteID}\` in the server ${guild.name}`});
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
