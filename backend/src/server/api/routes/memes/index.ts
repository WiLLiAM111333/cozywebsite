import { Router } from "../../../../../lib/server/router/Router";
import { Application, Router as expressRouter } from "express";
import { GimmeRouter } from "./gimme/router";
import { DadJokeRouter } from "./dadJoke/router";
import { RandomAPIRouter } from "./randomAPI/router";

export class MemeRouter extends Router {
  private dadJokeRouter: DadJokeRouter;
  private gimmeRouter: GimmeRouter;
  private randomAPIRouter: RandomAPIRouter;

  public constructor(app: Application) {
    super({
      app,
      route: '/memes',
      router: expressRouter()
    });

    this.gimmeRouter = new GimmeRouter(app);
    this.dadJokeRouter = new DadJokeRouter(app);
    this.randomAPIRouter = new RandomAPIRouter(app);

    this.router.use(this.randomAPIRouter.route, this.randomAPIRouter.router);
    this.router.use(this.dadJokeRouter.route, this.dadJokeRouter.router);
    this.router.use(this.gimmeRouter.route, this.gimmeRouter.router);
  }
}
