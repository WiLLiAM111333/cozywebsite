/*






WORK IN PROGRESS







*/

import { User } from "discord.js";

export class TicTacToeManager {
  private players: Map<number, User>;
  private board: TicTacToeBoard;
  private currentPlayer: number;
  private moveTracker: { 1: number, 2: number };
  private totalMoves: number;

  public constructor() {
    this.board =  [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

    this.currentPlayer = 1;
    this.moveTracker = { 1: 0, 2: 0 }
  }

  public place(col: number, row: number) {
    this.board[col][row] = this.currentPlayer;
    
    this.setMoves();

    if(this.hasWin()) {
      this.finish('W');
    } else if(this.isFullBoard()) {
      this.finish('T');
    } else {
      this.currentPlayer = 3 - this.currentPlayer;
    }
  }

  private isFullBoard(): boolean {
    return this.totalMoves === 9;
  }

  private setMoves() {
    this.moveTracker[this.currentPlayer]++
    this.totalMoves = this.moveTracker[1] + this.moveTracker[2];
  }

  private finish(state: 'W' | 'T') {
    
  }

  // ty Daan 💖 👀 
  private hasWin(): boolean {
    if(this.totalMoves < 3) {
      return false;
    }

    for(let column = 0; column < 3; column++) {
      for(let row = 0; row < 3; row++) {
        const axes = [
          [ [column, row], [column, row + 1], [column, row + 2] ],
          [ [column, row], [column + 1, row], [column + 2, row] ],
          [ [column, row], [column + 1, row + 1], [column + 2, row + 2] ],
          [ [column, row], [column + 1, row - 1], [column + 2, row - 2] ]
        ]

        for(let i = 0; i < 3; i++) {
          const hasWin = axes[i].every(([column, row]) =>
            column >= 0 && column < 3
            && row >= 0 && row < 3
            && this.board[column][row] === this.currentPlayer
          );

          if(hasWin) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
