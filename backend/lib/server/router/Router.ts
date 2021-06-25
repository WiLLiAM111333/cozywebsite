import { Application, Router as expressRouter } from 'express';;
import { IRouter } from './IRouter';
import { db } from '../../../src/db/index';
import { Controller } from '../controller/Controller';
import { RouterConstructor } from './RouterConstructor';
import { Base } from '../../Base';

/**
 * Abstract base class for Router classes to extend from. This is used to create express Routers.
 * @exports
 * @abstract
 * @class
 * @implements {IRouter}
 * @extends {Base}
 */
export abstract class Router extends Base implements IRouter {
  /**
   * The URL route the router controls.
   * @public
   */
  public readonly route: Readonly<string>;
  /**
   * The express-insantiated router to handle the *router stuff*.
   * @public
   */
  public readonly router: expressRouter;
  /**
   * The express application the router is supposed to reference.
   * @public
   */
  public readonly app: Readonly<Application>;
  /**
   * The controller the router can use if it exists
   * @protected
   */
  protected readonly controller?: Readonly<Controller>;

  /**
   * @public
   * @constructor
   * @param {RouterConstructor} data 
   */
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
