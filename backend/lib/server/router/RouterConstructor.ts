import { IRouter } from "./IRouter";
import { Controller } from "../controller/Controller";

export interface RouterConstructor extends IRouter {
  controller?: Controller;
}
