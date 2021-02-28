import { createWriteStream } from 'fs';
import { readFile } from 'fs/promises';
import { DataFileParser } from '../DataFileParser';

export class CSVParser extends DataFileParser {
  public constructor() {
    super();
  }

  private async readCSVFile(path: string): Promise<string> {
    try {
      const csv = await readFile(path, { encoding: 'utf-8' })
      
      return csv
    } catch (err) {
      console.error(err);
    }
  }

  protected toArray(csv: string): Array<string> {
    return csv.split('\n');
  }

  public async parse(path: string): Promise<Array<object>> {
    try {
      const newArr: Array<object> = [];
      const csv = await this.readCSVFile(path);
      const arr = this.toArray(csv);

      const headers = arr.shift()
        .split(',')
        .map(header => header === '""' ? 'unnamed' : header);

      for(let i = 0; i < arr.length; i++) {
        const row = arr[i].split(',');
        
        if(row.length === headers.length) {
          newArr[i] = {};

          for(let o = 0; o < row.length; o++) {
            const header = headers[o].replace(/"/, '');
            const col = row[o].replace(/"/, '');
            const value = col.trim() === '' ? 'NULL' : col;
            
            Object.assign(newArr[i], { [header]: value });
          }
        }
      }

      return newArr;
    } catch (err) {
      console.error(err);    
    }
  }

  public async toJSON(dataPath: string): Promise<string>;
  public async toJSON(dataPath: string, targetPath: string): Promise<string>;
  public async toJSON(dataPath: string, targetPath?: string): Promise<string> {
    try {
      const parsedCSV = await this.parse(dataPath);
      const data = JSON.stringify(parsedCSV, null, 2)

      if(targetPath) {
        const stream = createWriteStream(targetPath);
        
        stream.write(data, (err) => {
          if(err) {
            console.error(err);
          }
        });

        stream.destroy();
      }

      return dataPath;
    } catch (err) {
      console.error(err);
    }
  }
}
