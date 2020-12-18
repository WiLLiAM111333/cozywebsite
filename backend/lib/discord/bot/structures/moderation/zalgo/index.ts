import { InternalMath } from '../../../../../math/index';
import { Constants } from '../../../../../../src/utils/constants';

const { DEFAULT_ZALGO_THRESHOLD } = Constants;

export class Zalgo {
  private text: string;
  private threshold: number;
  private zalgoRegex: RegExp;
  private math: InternalMath;

  public constructor(text: string) {
    this.text = text;
    this.threshold = DEFAULT_ZALGO_THRESHOLD;
    this.zalgoRegex = /[\p{Mn}\p{Me}]+/u;
    this.math = new InternalMath();
  }

  private compose(str?: string) {
    if(str) {
      return str.normalize('NFC');
    }

    return this.text.normalize('NFC');
  }

  private decompose(str?: string) {
    if(str) {
      return str.normalize('NFD');
    }

    return this.text.normalize('NFD');
  }

  private computeScore(): Array<number> {
    const scoreArr: Array<number> = [];

    if(!this.text.trim().length) {
      return [0];
    } 

    for(const word of this.decompose().split(/\s+/)) {
      let banned = 0;

      for(const char of word) {
        if(this.zalgoRegex.test(char)) {
          ++banned;
        }
      }

      const score = banned / word.length;
      scoreArr.push(score)
    }

    return scoreArr;
  }

  public isZalgo(threshold?: number): boolean {
    if(!threshold) {
      threshold = this.threshold;
    }

    const wordScore = this.computeScore();
    const totalScore = this.math.percentile(wordScore, 0.75);

    return totalScore >= threshold;
  }

  public clean(threshold?: number) {
    if(!threshold) {
      threshold = this.threshold;
    }

    let cleaned = '';

    for(const word of this.decompose().split(/\s+/)) {
      if(new Zalgo(word).isZalgo(threshold)) {
        for(const char of word) {
          if(!this.zalgoRegex.test(char)) {
            cleaned += char;
          }
        }
      } else {
        cleaned += word;
      }
    }

    return this.compose(cleaned);
  }
}
