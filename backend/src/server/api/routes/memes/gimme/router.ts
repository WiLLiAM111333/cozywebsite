import { Router } from "../../../../../../lib/server/router/Router";
import { GimmeController } from './controller';
import { Application, Router as expressRouter } from "express";

export class GimmeRouter extends Router {
  protected controller: GimmeController;

  public constructor(app: Application) {
    super({
      app,
      route: '/reddit',
      router: expressRouter(),
      controller: new GimmeController()
    });

    this.router.get('/', this.controller.getRedditMeme());
  }
}
