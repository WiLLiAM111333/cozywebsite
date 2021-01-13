import { Base } from '../../index';

/**
 * Empty class other than extending the `Base` class. 
 * This will be used as a class to extend from when making controllers to go on the `Router` classes
 * @exports
 * @abstract
 * @class
 * @extends {Base}
 */
export abstract class Controller extends Base {
  /**
   * @public
   * @constructor
   */
  public constructor() {
    super();
  }
}
