import { Application, Router as expressRouter } from 'express';;
import { IRouter } from './IRouter';
import { db } from '../../src/db/index';
import { Controller } from '../controller/Controller';
import { RouterConstructor } from './RouterConstructor';
import { Base } from '../';

export abstract class Router extends Base implements IRouter {
  public route: string;
  public router: expressRouter;
  public app: Application;
  protected controller?: Controller;

  public constructor(data: RouterConstructor) {
    super();

    const { route, router, app, controller } = data;
    
    this.route = route;
    this.router = router;
    this.app = app;
    this.db = db;
    this.controller = controller;
  }
}
