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

export const boardRepository = {
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId): number[][] => {
    board[y][x] = userColorRepository.getUserColor(userId);
    return board;
  },
};
