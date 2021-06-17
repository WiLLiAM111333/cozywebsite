import { Application, Router as expressRouter } from "express";
import { Router } from "../../../../../../lib/server/router/Router";
import { DadJokeController } from "./controller";

export class DadJokeRouter extends Router {
  declare protected controller: DadJokeController
  
  public constructor(app: Application) {
    super({
      app,
      route: '/dadjoke',
      router: expressRouter(),
      controller: new DadJokeController() 
    });

    this.router.get('/', this.controller.getDadJoke());
  }  
} 
