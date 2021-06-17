export class Game {
  private isAFK: boolean;

  public constructor() {
    this.isAFK = false;
  }

  protected handleWin(winner: string, reward: string): void {
    // Give win reward
    // Give play reward
  }

  protected handleLoss(loser: string): void {
    // Give play reward
  }

  // Check some more stuff
  protected validate(...players: [string, string]): boolean {
    return this.areDifferentPlayers(...players)
  }

  // Not sure yet
  private areDifferentPlayers(playerOne: string, playerTwo: string): boolean {
    return !(playerOne === playerTwo);
  }
}
