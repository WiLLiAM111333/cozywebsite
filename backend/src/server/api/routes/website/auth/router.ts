import { Router } from "../../../../../../lib/server/router/Router";
import { AuthController } from "./controller";
import { Application, Router as expressRouter } from "express";

export class AuthRouter extends Router {
  protected controller: AuthController;

  public constructor(app: Application) {
    super({
      app,
      route: '/auth',
      router: expressRouter(),
      controller: new AuthController()
    });
  }
}
