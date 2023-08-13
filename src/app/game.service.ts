import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public board: any = [];
  boardSize: number = 9;
  activePlayer: string = "X";
  turnCount: number = 0;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;

  constructor() {
    this.newGame();
  }

  newGame(){
    this.activePlayer = "X";
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.winner = false;
    this.board = this.createBoard();
  }

  createBoard() {
    let board: any[] = [];
    for (let i: number = 0; i < 9; i++) {
      board.push({ id: 1, state: null });
    }
    return board;
  }

  get getBoard() {
    return this.board;
  }

  set setBoard(board: any) {
    this.board = [...board];
  }

  changePlayerTurn(squareClicked: any) :void {
    this.updateBoard(squareClicked);
    if(!this.isGameOver) this.activePlayer = this.activePlayer === "X" ? "O" : "X";
    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;
  }

  updateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state;
    if(this.winner) {
      this.winner = true;
      this.isGameOver = false;
      this.isGameOver = true;
    }
  }

  get gameOver(): boolean {
    return this.turnCount > 0 || this.winner ? true : false;
  }

  get isWinner(): boolean {
    return this.checkDiag() || this.checkRows(this.board, "row") ||
        this.checkRows(this.board, "col") ? true : false;
  }

  checkRows(board: any, mode: any) {
    const
      ROW = mode === "row",
      DIST = ROW ? 1 : 3,
      INC = ROW ? 3 : 1,
      NUMTIMES = ROW ? 7 : 3;

    for ( let i = 0; i < NUMTIMES; i += INC) {
      let
        firstSquare = board[i].state,
        secondSquare = board[i + DIST].state,
        thirdSquare = board[i + (DIST * 2)].state;

      if(firstSquare && secondSquare && thirdSquare) {
        if(firstSquare === secondSquare === thirdSquare) return true;
      }
    }
    return false;
  }

  checkDiag() {
    const timesRun = 2,
      midSquare = this.board[4].state;

    for(let i= 0; i <= timesRun; i += 2) {
      let
        upperCorner = this.board[i].state,
        lowerCorner = this.board[8 - i].state;

      if (midSquare && upperCorner && lowerCorner) {
        if (midSquare === upperCorner === lowerCorner) return true;
      }
    }
    return false;
  }
}
