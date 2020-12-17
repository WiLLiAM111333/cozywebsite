import { Application, Router } from 'express';

export interface IRouter {
  route: string;
  router: Router;
  app: Application;
}
