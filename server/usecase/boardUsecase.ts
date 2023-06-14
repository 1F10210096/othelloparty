import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorUsecase } from './userColorUsecase';
export type BoardArr = number[][];
export type Pos = { x: number; y: number };
const board: BoardArr = [
  [1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 3, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 3, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
export const look_right = (x: number, y: number, userId: UserId) => {
  const lookside = board[y].slice(x + 1, 8);
  const somecoma = lookside.indexOf(userColorUsecase.getUserColor(userId));
  const looka = lookside.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let i = 1; i <= somecoma; i++) {
      board[y][x + i] = userColorUsecase.getUserColor(userId);
    }
  }
  return board;
};
export const look_left = (x: number, y: number, userId: UserId) => {
  const lookside = board[y].slice(0, x).reverse();
  const somecoma = lookside.indexOf(userColorUsecase.getUserColor(userId));
  const looka = lookside.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let i = 1; i <= somecoma; i++) {
      board[y][x - i] = userColorUsecase.getUserColor(userId);
    }
  }
  return board;
};
export const look_Vertical1 = (x: number, y: number, userId: UserId) => {
  const a = board.slice(y + 1, 8);
  const b = a.map((item) => item[x]);
  const somecoma = b.indexOf(userColorUsecase.getUserColor(userId));
  const looka = b.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let i = 1; i <= somecoma; i++) {
      board[y + i][x] = userColorUsecase.getUserColor(userId);
    }
  }
};
export const look_Vertical2 = (x: number, y: number, userId: UserId) => {
  const a = board.slice(0, y).reverse();
  const b = a.map((item) => item[x]);
  const somecoma = b.indexOf(userColorUsecase.getUserColor(userId));
  const looka = b.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let i = 1; i <= somecoma; i++) {
      board[y - i][x] = userColorUsecase.getUserColor(userId);
    }
  }
};
export const look_naname = (x: number, y: number, userId: UserId) => {
  let i = 1;
  const a = [];
  while (x + i < board.length && y + i < board.length) {
    a.push(board[y + i][x + i]);
    i++;
  }
  const somecoma = a.indexOf(userColorUsecase.getUserColor(userId));
  const looka = a.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let j = 1; j <= somecoma; j++) {
      board[y + j][x + j] = userColorUsecase.getUserColor(userId);
    }
  }
};
export const look_naname2 = (x: number, y: number, userId: UserId) => {
  let i = 1;
  const a = [];
  while (x - i >= 0 && y - i >= 0) {
    a.push(board[y - i][x - i]);
    i++;
  }
  const somecoma = a.indexOf(userColorUsecase.getUserColor(userId));
  const looka = a.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let j = 1; j <= somecoma; j++) {
      board[y - j][x - j] = userColorUsecase.getUserColor(userId);
    }
  }
};
export const look_naname3 = (x: number, y: number, userId: UserId) => {
  let i = 1;
  const a = [];
  while (x + i < board.length && y - i >= 0) {
    a.push(board[y - i][x + i]);
    i++;
  }
  const somecoma = a.indexOf(userColorUsecase.getUserColor(userId));
  const looka = a.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let j = 1; j <= somecoma; j++) {
      board[y - j][x + j] = userColorUsecase.getUserColor(userId);
    }
  }
};
export const look_naname4 = (x: number, y: number, userId: UserId) => {
  let i = 1;
  const a = [];
  while (x - i >= 0 && y + i < board.length) {
    a.push(board[y + i][x - i]);
    i++;
  }
  const somecoma = a.indexOf(userColorUsecase.getUserColor(userId));
  const looka = a.slice(0, somecoma);
  if (looka.indexOf(0) === -1) {
    for (let j = 1; j <= somecoma; j++) {
      board[y + j][x - j] = userColorUsecase.getUserColor(userId);
    }
  }
};
const look_right_kouho = (x: number, y: number,userId: UserId) => {
  const lookside = board[y].slice(x + 1, 8);
  const somecoma = lookside.indexOf(3-userColorUsecase.getUserColor(userId));
  const looka = lookside.slice(0, somecoma);
  if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
    board[y][x] = 3;
  }
};
export const look_left_kouho = (x: number, y: number, userId: UserId) => {
  const lookside = board[y].slice(0, x).reverse();
  const somecoma = lookside.indexOf(3-userColorUsecase.getUserColor(userId));
  const looka = lookside.slice(0, somecoma);
  if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
    board[y][x] = 3;
  }
  return board;
};
export const look_Vertical1_kouho = (x: number, y: number, userId: UserId) => {
  const a = board.slice(y + 1, 8);
  const b = a.map((item) => item[x]);
  const somecoma = b.indexOf(3-userColorUsecase.getUserColor(userId));
  const looka = b.slice(0, somecoma);
  if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
    board[y][x] = 3;
  }
};
export const look_Vertical2_kouho = (x: number, y: number, userId: UserId) => {
  const a = board.slice(0, y).reverse();
  const b = a.map((item) => item[x]);
  const somecoma = b.indexOf(3-userColorUsecase.getUserColor(userId));
  const looka = b.slice(0, somecoma);
  if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
    board[y][x] = 3;
  }
};
export const look_naname_kouho = (x: number, y: number, userId: UserId) => {
  let i = 1;
  const a = [];
  while (x + i < board.length && y + i < board.length) {
    a.push(board[y + i][x + i]);
    i++;
  }
  const somecoma = a.indexOf(3-userColorUsecase.getUserColor(userId));
  const looka = a.slice(0, somecoma);
  if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
    board[y][x] = 3;
  }
};
export const look_naname2_kouho = (x: number, y: number, userId: UserId) => {
  let i = 1;
  const a = [];
  while (x - i >= 0 && y - i >= 0) {
    a.push(board[y - i][x - i]);
    i++;
  }
  const somecoma = a.indexOf(3-userColorUsecase.getUserColor(userId));
  const looka = a.slice(0, somecoma);
  if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
    board[y][x] = 3;
  }
};
export const look_naname3_kouho = (x: number, y: number, userId: UserId) => {
  let i = 1;
  const a = [];
  while (x + i < board.length && y - i >= 0) {
    a.push(board[y - i][x + i]);
    i++;
  }
  const somecoma = a.indexOf(3-userColorUsecase.getUserColor(userId));
  const looka = a.slice(0, somecoma);
  if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
    board[y][x] = 3;
  }
};
export const look_naname4_kouho = (x: number, y: number, userId: UserId) => {
  let i = 1;
  const a = [];
  while (x - i >= 0 && y + i < board.length) {
    a.push(board[y + i][x - i]);
    i++;
  }
  const somecoma = a.indexOf(3-userColorUsecase.getUserColor(userId));
  const looka = a.slice(0, somecoma);
  if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
    board[y][x] = 3;
  }
};
let playerColor = 1;
export const boardRepository = {
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId): number[][] => {
    if (board[y][x] !== 0 && board[y][x] !== 3) {
      return board;
    }
    
    if (playerColor === userColorUsecase.getUserColor(userId)) {
      look_naname(x, y, userId);
      look_naname2(x, y, userId);
      look_naname3(x, y, userId);
      look_naname4(x, y, userId);
      look_right(x, y, userId);
      look_left(x, y, userId);
      look_Vertical1(x, y, userId);
      look_Vertical2(x, y, userId);
      board[y][x] = userColorUsecase.getUserColor(userId);
      board.forEach((row, y) => {
        row.forEach((element, x) => {
          if (element === 3) {
            board[y][x] = 0;
          }
        });
      });
      board.forEach((row, y) => {
        row.forEach((element, x) => {
          if (element === 0) {
            look_right_kouho(x, y,userId);
            look_left_kouho(x, y,userId);
            look_Vertical1_kouho(x, y,userId);
            look_Vertical2_kouho(x, y,userId);
            look_naname_kouho(x, y,userId);
            look_naname2_kouho(x, y,userId);
            look_naname3_kouho(x, y,userId);
            look_naname4_kouho(x, y,userId);
          }
        });
      });
      playerColor = 3 - userColorUsecase.getUserColor(userId);
      console.log(board);
    }
    return board;
  },
};
// const look_right_kouho = (x: number, y: number) => {
//   const lookside = board[y].slice(x + 1, 8);
//   const somecoma = lookside.indexOf(1);
//   const looka = lookside.slice(0, somecoma);
//   if (looka.indexOf(0) === -1) {
//     board[y][x] = 3; // 駒を置く場合は3を代入
//   }
// };
// const onClick = (x: number, y: number) => {
  // board.forEach((row, y) => {
  //   row.forEach((element, x) => {
  //     if (element === 0) {
  //       look_right(x, y);
  //     }
  //   });
  // });
//   console.log(board);
// };




