import { Client } from 'discord.js';
import { DiscordRouter } from '../../../../../../lib/discord/router/DiscordRouter';
import { Application, Router as expressRouter } from 'express';
import { UserController } from './controller';

export class UserRouter extends DiscordRouter {
  declare protected readonly controller: Readonly<UserController>;

  public constructor(app: Application, client: Client) {
    super({
      app,
      client,
      route: '/users',
      router: expressRouter(),
      controller: new UserController()
    });
   
    this.router.get('/', this.controller.getAll());
    this.router.get('/:id', this.controller.getByID());
  }
}
