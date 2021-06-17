import { MessageEmbed, User } from 'discord.js';
import fetch from 'node-fetch';
import { IDadJokeResponse } from './dadJoke/IDadJokeResponse';
import { IRandomAPIMeme } from './randomAPI/IRandomAPIMeme';
import { IRedditMemeData } from './reddit/IRedditMemeData';
import { IRedditResponse } from "./reddit/IRedditResponse";

export class MemeManager {
  private randomAPIMemeURL: string;
  private gimmeMemeURL: string;
  private dadJokeURL: string;

  public constructor() {
    this.randomAPIMemeURL = 'https://some-random-api.ml/meme/';
    this.gimmeMemeURL = 'https://meme-api.herokuapp.com/gimme/{sub_reddit}/1';
    this.dadJokeURL = 'https://icanhazdadjoke.com/slack';
  }

  public async getRedditMeme(subreddit: 'memes' | 'me_irl' | 'dankmemes'): Promise<IRedditMemeData> {
    const url = this.gimmeMemeURL.replace(
      /\/\{sub_reddit\}/,
      subreddit ? `/${subreddit}` : ''
    );
    
    try { 
      const res = await fetch(url);
      const json: IRedditResponse = await res.json();

      return json.memes[0];
    } catch (err) {
      this.handleRedditError(err);
    }
  }

  public async getRandomAPIMeme(): Promise<IRandomAPIMeme> {
    try {
      const res = await fetch(this.randomAPIMemeURL);
      const json: IRandomAPIMeme = await res.json();

      return json;
    } catch (err) {
      this.handleRandomAPIError(err);
    }
  }

  public async getDadJoke(): Promise<IDadJokeResponse> {
    try {
      const res = await fetch(this.dadJokeURL);
      const json: IDadJokeResponse = await res.json();

      return json;
    } catch (err) {
      this.handleDadJokeError(err);
    }
  }

  public async randomMemeEmbed(author: User): Promise<MessageEmbed> {
    const memeFunctions: Array<Function> = [this.getDadJoke, this.getRandomAPIMeme, this.getRedditMeme];
    const subs: Array<SubredditStrings> = ['dankmemes', 'me_irl', 'memes'];

    try {
      const func = memeFunctions[Math.floor(Math.random() * memeFunctions.length)];
      
      const data = func === this.getDadJoke
        ? await this.getDadJoke()
        : func === this.getRandomAPIMeme
          ? await this.getRandomAPIMeme()
          : await this.getRedditMeme(subs[Math.floor(Math.random() * subs.length)])

      const embed = new MessageEmbed()
        .setColor('#0097f5')
        .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))

      if('subreddit' in data) {
        embed
          .setDescription(`**${data.title}**`)
          .setImage(data.preview[2])
      } else if('attachments' in data) {
        embed
          .setDescription(data.attachments[0].text)
      } else {
        embed
          .setDescription(`**${data.caption}**`)
          .setImage(data.image)
      }

      return embed;
    } catch (err) {
      console.error(err);
    }
  }

  public async getDadJokeEmbed(author: User): Promise<MessageEmbed> {
    try {
      const data = await this.getDadJoke();

      return new MessageEmbed()
        .setColor('#0097f5')
        .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
        .setDescription(data.attachments[0].text)
    } catch (err) {
      console.error(err);
    }
  }

  private handleRedditError(err: /* unknown for now */ unknown) {
    console.error(err);
  }

  private handleRandomAPIError(err: /* unknown for now*/ unknown) {
    console.error(err);
  }

  private handleDadJokeError(err: /* unknown for now*/ unknown) {
    console.error(err);
  }
}
