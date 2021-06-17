import owners from '../../../../config/owners.json';
import { Client, ClientEvents, ClientOptions, Snowflake, User } from "discord.js";
import { join } from 'path';
import { readdir } from 'fs/promises';
import { CommandHandler } from "../structures/command/handler/CommandHandler";
import { AutoMod } from "../structures/moderation/autoMod/AutoMod";
import { AnimalManager } from "../../../animal/AnimalManager";
import { Modmail } from '../../modmail';
import { ProfileManager } from '../structures/profile/ProfileManager';
import { StarBoardManager } from '../structures/starboard/StarBoardManager';
import { Logger } from '../../../logger/Logger';

export class CozyClient extends Client {
  private eventPath: string;
  public commandHandler: CommandHandler;
  public animalManager: AnimalManager;
  public profileManager: ProfileManager;
  public owners: Array<Snowflake>;
  public autoMod: AutoMod;
  public editSnipes: Map<Snowflake, { oldContent: string; newContent: string }>;
  public snipes: Map<Snowflake, { content: string, author: User }>;
  public starBoardManager: StarBoardManager;
  public logger: Logger;
  private modMail: Modmail;
  
  public constructor(options?: ClientOptions) {
    super(options);

    this.eventPath = options.eventPath;
    this.owners = owners;
    this.commandHandler = new CommandHandler(this);
    this.autoMod = new AutoMod(this);
    this.animalManager = new AnimalManager();
    this.profileManager = new ProfileManager();
    this.editSnipes = new Map();
    this.snipes = new Map();
    this.starBoardManager = new StarBoardManager();
    this.logger = new Logger();
    // this.modMail = new Modmail(this);

    this.loadEvents();
  }

  /**
   * # Remove this
   * Move it to an event handler later
   */
  private async loadEvents(): Promise<void> {
    try {
      const files = await readdir(this.eventPath);

      for(const file of files) {
        const eventFile = join(this.eventPath, file);
        const eventName = file.split('.')[0];

        const { event }: {
          event: <T extends keyof ClientEvents>(...params: Array<ClientEvents[T]>) => (void | Promise<void>)
        } = await import(eventFile);

        this.on(eventName, event.bind(null, this));
      }
    } catch (err) {
      console.log(err);
      this.emit('error', err);
    }
  }
}
