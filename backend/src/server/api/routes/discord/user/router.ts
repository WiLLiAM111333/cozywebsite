import { Client } from 'discord.js';
import { DiscordRouter } from '../../../../../../lib/discord/router/DiscordRouter';
import { 
  Application, 
  Request,
  Response,
  Router as expressRouter
} from 'express';
import { UserController } from './controller';

export class UserRouter extends DiscordRouter {
  protected controller: UserController;

  public constructor(app: Application, client: Client) {
    super({
      app,
      client,
      route: '/users',
      router: expressRouter(),
      controller: new UserController()
    });
   
    this.router.get('/', this.getAllUsers());
    this.router.get('/:id', this.getUserByID());
  }

  private getAllUsers(): (req: Request, res: Response) => void {
    return (req, res): void => {
      const users = this.controller.getAll();

      res.status(200).json(users);
    };
  }

  private getUserByID(): (req: Request, res: Response) => void {
    return (req, res): void => {
      const user = this.controller.getByID(req.params.id);

      if(!user) {
        res.status(400).json({
          message: 'No user was found by that ID',
          recievedID: req.params.id
        });

        return;
      }
      
      res.status(200).json(user);
    };
  }
}
