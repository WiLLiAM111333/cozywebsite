import { Application, Router } from 'express';

/**
 * The router interface. This is only implemented on the abstract base class
 * @exports
 * @interface
 */
export interface IRouter {
  route: Readonly<string>;
  router: Router;
  app: Readonly<Application>;
}
