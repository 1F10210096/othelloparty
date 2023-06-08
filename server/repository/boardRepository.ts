import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorRepository } from './userColorRepositry';

export type BoardArr = number[][];

export type Pos = { x: number; y: number };

const board: BoardArr = [
  ...Array.from({ length: 3 }, () => Array(8).fill(0)),
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  ...Array.from({ length: 3 }, () => Array(8).fill(0)),
];

// const board2 = [
//   [0, 1, 2, 3, 4, 5, 6, 7],
//   [8, 9, 10, 11, 12, 13, 14, 15],
//   [16, 17, 18, 19, 20, 21, 22, 23],
//   [24, 25, 26, 27, 28, 29, 30, 31],
//   [32, 33, 34, 35, 36, 37, 38, 39],
//   [40, 41, 42, 43, 44, 45, 46, 47],
//   [48, 49, 50, 51, 52, 53, 54, 55],
//   [56, 57, 58, 59, 60, 61, 62, 63],
// ];

export const look = (x: number, y: number) => {
  const lookside = board[y].slice(x + 1, 8); // xとyのインデックスが逆になっていたため修正
  const somecoma = lookside.indexOf(1);
  const looka = lookside.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let i = 1; i <= somecoma; i++) {
      board[y][x + i] = 1;
    }
  }
  return board;
};
export const boardRepository = {
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId): number[][] => {
    look(x, y);
    board[y][x] = userColorRepository.getUserColor(userId);
    console.log(board);
    return board;
  },
};
