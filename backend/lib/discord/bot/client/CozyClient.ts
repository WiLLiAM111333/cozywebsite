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
import { WelcomeGoodByeManager } from '../structures/welcome/WelcomeGoodByeManager';

export class CozyClient extends Client {
  private readonly eventPath: Readonly<string>;
  public readonly commandHandler: Readonly<CommandHandler>;
  public readonly animalManager: Readonly<AnimalManager>;
  public readonly profileManager: Readonly<ProfileManager>;
  public readonly owners: ReadonlyArray<Snowflake>;
  public readonly autoMod: Readonly<AutoMod>;
  public editSnipes: Map<Snowflake, { oldContent: string; newContent: string }>;
  public snipes: Map<Snowflake, { content: string, author: User }>;
  public readonly starBoardManager: Readonly<StarBoardManager>;
  public readonly logger: Readonly<Logger>;
  public readonly modMail: Readonly<Modmail>;
  public readonly welcomeGoodByeManager: Readonly<WelcomeGoodByeManager>;
  
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
    this.welcomeGoodByeManager = new WelcomeGoodByeManager();
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
