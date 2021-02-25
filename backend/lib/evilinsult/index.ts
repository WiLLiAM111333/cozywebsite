/*






WORK IN PROGRESS







*/

export class EvilInsultWrapper {
  private apiURL: string;

  public constructor() {
    this.apiURL = 'https://evilinsult.com/generate_insult.php?lang=en&type=json'
  }

  public async getInsult() {
    try {
      const res = await fetch(this.apiURL);
      const json = await res.json();
      json.insult = this.cleanInsult(json.insult);
      
      return json;
    } catch(err) {
      console.log(err);
    }
  }

  // pain
  public cleanInsult(str: string) {
    return str.replace(/&NewLine;/ig, '\n')
      .replace(/&excl;/ig, '!')
      .replace(/&(quot|QUOT);/ig, '"')
      .replace(/&num;/ig, '#')
      .replace(/&dollar;/ig, '$')
      .replace(/&percnt;/ig, '%')
      .replace(/&(amp|AMP);/ig, '&')
      .replace(/&apos;/ig, '\'')
      .replace(/&lpar;/ig, '(')
      .replace(/&rpar;/ig, ')')
      .replace(/&(ast|midast);/ig, '*')
      .replace(/&plus;/ig, '+')
      .replace(/&comma;/ig, ',')
      .replace(/&period;/ig, '.')
      .replace(/&sol;/ig, '/')
      .replace(/&colon;/ig, ':')
      .replace(/&semi;/ig, ';')
      .replace(/&(lt|LT);/ig, '<')
      .replace(/&equals;/ig, '=')
      .replace(/&(gt|GT);/ig, '>')
      .replace(/&quest;/ig, '?')
      .replace(/&commat;/ig, '@')
      .replace(/&iexcl;/ig, '!')
  }
}
