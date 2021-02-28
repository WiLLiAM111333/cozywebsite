import { readFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import { DataFileParser } from '../DataFileParser';

export class TXTParser extends DataFileParser {
  public constructor() {
    super();
  }
  
  private async readTXTFile(path: string): Promise<string> {
    try {
      const str = await readFile(path, { encoding: 'utf-8' });

      return str;
    } catch (err) {
      console.error(err);
    }
  }

  protected toArray(content: string): Array<string> {
    return content.split('\n');
  }

  public async parse(path: string): Promise<Array<string>> {
    try {
      const str = await this.readTXTFile(path);
      const arr = this.toArray(str);

      return arr;
    } catch (err) {
      console.error(err);
    }
  }

  public async toJSON(dataPath: string): Promise<string>;
  public async toJSON(dataPath: string, targetPath: string): Promise<string>;
  public async toJSON(dataPath: string, targetPath?: string): Promise<string> {
    const content = await this.readTXTFile(dataPath);
    const data = `[\n  ${content}\n]`

    if(targetPath) {
      const stream = createWriteStream(targetPath);
      
      stream.write(data, (err) => {
        if(err) {
          console.error(err);
        }
      });

      stream.destroy();
    }

    return data;
  }
}
