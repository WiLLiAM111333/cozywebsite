import { join } from 'path';
import { ILogPaths } from './ILogPaths';

export abstract class BaseLogger {
  protected logPaths: ILogPaths;

  public constructor() {
    this.logPaths = {
      base: join(__dirname, '..', '..', '..', 'logs'),
      discord: join(__dirname, '..', '..', '..', 'logs', 'discord'),
      http: join(__dirname, '..', '..', '..', 'logs', 'http.log'),
      ws: join(__dirname, '..', '..', '..', 'logs', 'ws')
    }
  }
}
