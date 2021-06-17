import { join } from 'path';
import { BaseLogger } from "./BaseLogger";
import { WriteStream, createWriteStream } from "fs";
import { readdir, writeFile, mkdir } from 'fs/promises';
import { ILogFormats } from './ILogFormats';
import { LogTarget } from './LogTarget';
import { ModerationEvents } from '../discord/bot/structures/moderation/events/ModerationEvents';
import { Snowflake } from 'discord.js';
import { NextFunction, Request, Response } from 'express';

// God bless chalk
import { cyan, yellow, red, green, greenBright, blueBright } from 'chalk';

export class Logger extends BaseLogger {
  private formats: ILogFormats;
  private writeStreams: Map<LogTarget, WriteStream>;

  public constructor() {
    super();
    
    this.writeStreams = new Map();

    this.setUpLogDir();

    this.formats = {
      http: `[{time}] [REST] {method} {url} {statusCode} {remoteIP}`,
      moderation: `[{time}] [MODERATION] {action} userID: "{userID}" reason: "{reason}"`,
    }
  }

  private async setUpLogDir(): Promise<void> {
    try {
      const rootDir = join(__dirname, '..', '..', '..');
      const existingDir = await readdir(rootDir);

      if(!existingDir.includes('logs')) {
        await mkdir(this.logPaths.base);
      }

      const logDir = await readdir(this.logPaths.base);
      const httpPath = this.logPaths.http;

      if(!logDir.includes('http.log')) {
        await writeFile(httpPath, '');
      }
      
      if(!logDir.includes('discord')) {
        await mkdir(this.logPaths.discord);
      }

      if(!logDir.includes('ws')) {
        await mkdir(this.logPaths.ws);
      }

      this.writeStreams.set('http', createWriteStream(httpPath, { flags: 'a' }));

      const discordPath = this.logPaths.discord;
      const discordDir = await readdir(discordPath);

      if(!discordDir.includes('moderation.log')) {
        await writeFile(join(discordPath, 'moderation.log'), '')
      }

      this.writeStreams.set('moderation', createWriteStream(join(discordPath, 'moderation.log'), { flags: 'a' }));
    } catch (err) {
      console.error(err);
    }
  }

  public httpLogger(): (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
      const date = new Date().toLocaleString();

      const { method, url, ip } = req;
      const { statusCode } = res;

      if(req.url !== '/favicon.ico') {
        const str = this.formats.http
          .replace(/\{time\}/, date)
          .replace(/\{method\}/, method)
          .replace(/\{url\}/, url)
          .replace(/\{statusCode\}/, `${statusCode}`)
          .replace(/\{remoteIP\}/, ip);
          
        this.log('http', str);
        
        if(!process.env.NODE_ENV || ['development', 'testing'].includes(process.env.NODE_ENV?.toLowerCase())) {
          const code = statusCode >= 500
            ?  red(statusCode)
            : statusCode >= 400 // 400 error codes
              ? yellow(statusCode)
              : statusCode >= 300 // 300 status codes
                ? blueBright(statusCode)
                : statusCode >= 200 // 200 status codes
                  ? greenBright(statusCode)
                  : cyan(statusCode) // Whatever remains

          console.log(`[${green(date)}] [${red('REST')}] ${blueBright(method)} ${cyan(url)} ${code} ${cyan(ip)}`);
        }
      }

      next(null);
    }
  }

  public async moderationLog(action: Uppercase<keyof Omit<ModerationEvents, 'configCreate' | 'configUpdate'>>, userID: Snowflake, reason?: string): Promise<void> {
    try {
      const date = new Date().toLocaleString();

      const str = this.formats.moderation
        .replace(/\{time\}/, date)
        .replace(/\{action\}/, action)
        .replace(/\{userID\}/, userID)
        .replace(/\{reason\}/, reason ? reason : 'No reason provided');

        this.log('moderation', str);

        if(!process.env.NODE_ENV || ['development', 'testing'].includes(process.env.NODE_ENV?.toLowerCase())) {
          const coloredAction = (action === 'WARN' || action === 'REPORT')
            ? cyan(action)
            : ['MUTE', 'GIFBAN', 'EXTERNALEMOTEBAN'].includes(action)
              ? yellow(action)
              : (action === 'BAN' || action === 'KICK')
                ? red(action)
                : cyan(action); // idfk what this would be but hey ho

          console.log(`[${green(date)}] [${red('MODERATION')}] ${blueBright(action)} ${cyan(userID)} ${coloredAction} ${cyan(reason || 'No reason set')}`);
        }
    } catch (err) {
      console.error(err);
    }
  }

  private log(target: LogTarget, message: string): void {
    this.writeStreams.get(target).write(`${message}\n`);
  }
}
 