/*






WIP
UNTESTED
I HOPE IT WORKS THOUGH
PLEASE DO WORK CAUSE I DONT LIKE DOING THIS




*/

import { db } from '../../../../../src/db';
import { Constants } from '../../../../../src/utils/constants';
import { IStarBoard } from './IStarBoard';
import { IStarBoardConfig } from './IStarBoardConfig';
import {
  MessageReaction, 
  Guild, 
  User,
  TextChannel,
  MessageEmbed,
  Message
} from 'discord.js';

const { STARBOARD, STARBOARD_CONFIG } = Constants.TableNames;

export class StarBoardManager {
  private db: typeof db;
  private star: string;

  public constructor() {
    this.db = db;
    this.star = '⭐';
  }

  private validateReaction(reaction: MessageReaction, user?: User): boolean {
    return reaction.emoji.name === this.star && user ? !user.bot : true;    
  }

  private async getStarBoardConfig({ guild }: { guild: Guild }): Promise<IStarBoardConfig> {
    try {
      const guildID = guild.id;

      return (
        await this.db.table(STARBOARD_CONFIG).where({ guildID })
      )[0];
    } catch (err) {
      console.error(err);
    }
  }

  private createStarBoardEmbed({ content, url, author, channel }: Message) {
    return new MessageEmbed()
      .setColor('#ffdd00')
      .setDescription(`${content}\n\n[Click here to view context](${url})`)
      .setAuthor(
        `Sent by ${author.tag} in ${(channel as TextChannel).name}`,
        author.displayAvatarURL({ dynamic: true })
      );
  }

  public async handleReactionAdd(reaction: MessageReaction, user: User): Promise<void> {
    try {
      if(this.validateReaction(reaction, user)) {
        const { message } = reaction;
        const config = await this.getStarBoardConfig(message);
        
        if(config.enabled) {
          const starBoardChannel = message.guild.channels.cache.get(config.channelID) as TextChannel;
          
          const data: IStarBoard = (
            await this.db.table(STARBOARD)
              .select('*')
              .where({ messageID: message.id })
          )[0];

          const starCount = (
            await (await message.fetch())
              .reactions.cache.find(reaction => reaction.emoji.name === this.star)
              .fetch()
          ).count;
          
          if(!data) { // No starboard by this message id registered
            const embed = this.createStarBoardEmbed(message);
            const sentStarBoardMessage = await starBoardChannel.send(`${this.star} #${starCount}`, {
              embed
            });
  
            const starBoard: IStarBoard = {
              authorID: message.author.id,
              messageContent: message.content || 'No content',
              messageID: message.id,
              starBoardMessageID: sentStarBoardMessage.id
            }
  
            await this.db.table(STARBOARD)
              .where({ guildID: message.guild.id })
              .insert(starBoard);
          } else { // A starboard by this message id is registered
            const starBoardMsg = await starBoardChannel.messages.fetch(data.starBoardMessageID);
            
            starBoardMsg.edit({
              content: `${this.star} #${starCount}`
            });
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async handleReactionRemove(reaction: MessageReaction): Promise<void> {
    try {
      const config = await this.getStarBoardConfig(reaction.message);

      if(config.enabled && this.validateReaction(reaction)) {
        const starCount = reaction.count; 

        const starBoard: IStarBoard = await (
          this.db.table(STARBOARD).where({
            guildID: reaction.message.guild.id,
            messageID: reaction.message.id
          })
        )[0];

        if(starBoard) {
          const starBoardChannel = reaction.message.guild.channels.cache.get(config.channelID) as TextChannel;

          (await starBoardChannel.messages.fetch(starBoard.messageID)).edit({
            content: `${this.star} #${starCount}`
          });
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
}
