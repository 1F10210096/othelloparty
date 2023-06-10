import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorRepository } from './userColorRepositry';

export type BoardArr = number[][];

export type Pos = { x: number; y: number };

const board: BoardArr = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const look_right = (x: number, y: number) => {
  const lookside = board[y].slice(x + 1, 8);
  const somecoma = lookside.indexOf(1);
  const looka = lookside.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let i = 1; i <= somecoma; i++) {
      board[y][x + i] = 1;
    }
  }
  return board;
};

export const look_left = (x: number, y: number) => {
  const lookside = board[y].slice(0, x).reverse();
  const somecoma = lookside.indexOf(1);
  const looka = lookside.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let i = 1; i <= somecoma; i++) {
      board[y][x - i] = 1;
    }
  }
  return board;
};

export const look_Vertical = (x: number, y: number) => {
  const a = board.slice(y + 1, 8);
  const b = a.map((item) => item[x]);
  const somecoma = b.indexOf(1);
  const looka = b.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let i = 1; i <= somecoma; i++) {
      board[y + i][x] = 1;
    }
  }
};

export const look_naname = (x: number, y: number) => {
  let i = 1;
  const a = [];
  while (x + i < board.length && y + i < board.length) {
    a.push(board[x + i][y + i]);
    i++;
  }
  const somecoma = a.indexOf(1);
  const looka = a.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let j = 1; j <= somecoma; j++) {
      board[x + j][y + j] = 1 ; 
    }
  }
};

export const boardRepository = {
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId): number[][] => {
    look_naname(x, y);
    look_right(x, y);
    look_left(x, y);
    look_Vertical(x, y);
    
    board[y][x] = userColorRepository.getUserColor(userId);
    console.log(board);
    return board;
  },
};
