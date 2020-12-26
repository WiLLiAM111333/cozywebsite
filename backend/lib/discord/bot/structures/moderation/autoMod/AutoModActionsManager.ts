import { AutoMod } from "./AutoMod";

// It will communicate with the AutoMod class by events and execute the actions based on those and the config properties in AutoMod
// I plan on making everything private in here similar to AutoModConfigManager since it's planned to be used internally

export class AutoModActionsManager {
  private autoMod: AutoMod;

  public constructor(autoMod: AutoMod) {
    this.autoMod = autoMod;

    this.init();
  } 

  private init(): void {

  }
}
