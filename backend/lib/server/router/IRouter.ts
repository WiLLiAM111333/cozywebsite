import { Application, Router } from 'express';

/**
 * The router interface. This is only implemented on the abstract base class
 * @exports
 * @interface
 */
export interface IRouter {
  route: string;
  router: Router;
  app: Application;
}
