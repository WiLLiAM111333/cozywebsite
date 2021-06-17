/*


Create moderation config manager class
Communicates by events
It does not extend from Moderation to avoid certain scary things


*/

import { ModerationConfig } from "./ModerationConfig";
import { Moderation } from '../Moderation';

export class ModerationConfigManager {
  private config: ModerationConfig;
  private moderation: Moderation;

  public constructor(instance: Moderation) {
    this.moderation = instance;
  }
}
