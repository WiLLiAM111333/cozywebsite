import { Router } from "../../../../../../lib/router/Router";
import { AuthController } from "./controller";
import {
  Application,
  Request,
  Response,
  Router as expressRouter
} from "express";

export class AuthRouter extends Router {
  protected controller: AuthController;

  public constructor(app: Application) {
    super({
      app,
      route: '/auth',
      router: expressRouter(),
      controller: new AuthController()
    });

    this.router.get('/login', this.controller.registerUser());
  }
}