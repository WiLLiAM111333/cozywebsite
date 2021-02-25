import { ICoinflipUser } from "./ICoinflipUser";

export class CoinflipUser implements ICoinflipUser {
  public id: string;
  public wins: number;
  public losses: number;
  public totalGames: number;
  public winrate: string;

  public constructor(data: ICoinflipUser) {
    const { id, losses, totalGames, winrate, wins } = data;

    this.id = id;
    this.losses = losses;
    this.totalGames = totalGames;
    this.winrate = winrate;
    this.wins = wins;
  }
}
