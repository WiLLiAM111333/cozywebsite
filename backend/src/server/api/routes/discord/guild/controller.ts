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

  public getByID(): (req: Request, res: Response) => void {
    return (req, res) => {
      const id = req.params.id;
      const guild = this.client.guilds.cache.get(id);

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
}
