import { Client, ClientEvents, ClientOptions } from "discord.js";
import { join } from 'path';
import { readdir } from 'fs/promises';

export class CozyClient extends Client {
  private eventPath: string;

  public constructor(options?: ClientOptions) {
    super(options);

    this.eventPath = options.eventPath;
  }

  private async loadEvents(): Promise<void> {
    try {
      const files = await readdir(this.eventPath);
  
      for(const file of files) {
        const eventFile = join(this.eventPath, file);
        const eventName = file.split('.')[0];
  
        const { event }: {
          event: <T extends keyof ClientEvents>(...params: Array<ClientEvents[T]>) => void
        } = await import(eventFile);

        this.on(eventName, event.bind(null, this));
      }
    } catch (err) {
      this.emit('error', err);
    }
  }

  public async login(token: string): Promise<string> {
    await this.loadEvents();
    
    return super.login(token);
  }
}
