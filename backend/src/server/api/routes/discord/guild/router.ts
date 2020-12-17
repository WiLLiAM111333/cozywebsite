import { Client } from 'discord.js';
import { DiscordRouter } from '../../../../../../lib/discord/router/DiscordRouter';
import {
  Application,
  Request,
  Response,
  Router as expressRouter
} from 'express';
import { GuildController } from './controller';

export class GuildRouter extends DiscordRouter {
  protected controller: GuildController;

  public constructor(app: Application, client: Client) {
    super({
      app,
      client,
      route: '/guilds',
      router: expressRouter(),
      controller: new GuildController()
    });
   
    this.router.get('/', this.getAllGuilds());
    this.router.get('/:id', this.getGuildByID());
    this.router.get('/:id/emotes', this.getAllEmotes());
  }

  private getAllGuilds(): (req: Request, res: Response) => void {
    return (req, res) => {
      const guilds = this.controller.getAll();

      res.status(200).json(guilds);
    }
  }

  private getGuildByID(): (req: Request, res: Response) => void {
    return (req, res): void => {
      const guild = this.client.guilds.cache.get(req.params.id);

      if(!guild) {
        res.status(400).json({
          message: 'No guild was found by that ID',
          recievedID: req.params.id
        });

        return;
      }
        
      res.status(200).json(guild);
    };
  }

  private getAllEmotes(): (req: Request, res: Response) => void {
    return (req, res) => {
      const guild = this.client.guilds.cache.get(req.params.id);

      res.status(200).json();
    };
  }
}
