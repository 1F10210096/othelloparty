/* eslint-disable max-lines */
import type { UserId } from '$/commonTypesWithClient/branded';
import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomRepository';
import { roomIdParser } from '$/service/idParsers';
import assert from 'assert';
import { randomUUID } from 'crypto';
import { userColorUsecase } from './userColorUsecase';
const initBoard = () => [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 3, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 3, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const roomUsecase = {
  create: async () => {
    const newRoom: RoomModel = {
      id: roomIdParser.parse(randomUUID()),
      board: initBoard(),
      status: 'waiting',
      created: Date.now(),
      turn: 1,
      blackmen: 'a',
      whitemen: 'a',
      kansenn: [],
      knum: 0,
    };
    await roomsRepository.save(newRoom);
    return newRoom;
  },
  
  //click

  clickBoard: async (x: number, y: number, roomId: string, userId: UserId): Promise<RoomModel> => {
    const hogeroomId = await userColorUsecase.getUserColor(userId, roomId);
    const latest = await roomsRepository.findLatest(roomId);
    assert(latest, 'クリック出来てるんだからRoomが無いわけがない');
    const newBoard: number[][] = JSON.parse(JSON.stringify(latest.board));
    let newTurn: number = JSON.parse(JSON.stringify(latest.turn));

    const look_right = async (x: number, y: number) => {
      const lookside = latest.board[y].slice(x + 1, 8);
      const somecoma = lookside.indexOf(await hogeroomId);
      const looka = lookside.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let i = 1; i <= somecoma; i++) {
          newBoard[y][x + i] = await hogeroomId;
        }
      }
      return newBoard;
    };
    const look_left = async (x: number, y: number) => {
      const lookside = latest.board[y].slice(0, x).reverse();
      const somecoma = lookside.indexOf(await hogeroomId);
      const looka = lookside.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let i = 1; i <= somecoma; i++) {
          newBoard[y][x - i] = await hogeroomId;
        }
      }
      return newBoard;
    };

    const look_Vertical1 = async (x: number, y: number) => {
      const c = latest.board.slice(y + 1, 8);
      const b = c.map((item) => item[x]);
      const somecoma = b.indexOf(await hogeroomId);
      const looka = b.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let i = 1; i <= somecoma; i++) {
          newBoard[y + i][x] = await hogeroomId;
        }
      }
    };
    const look_Vertical2 = async (x: number, y: number) => {
      const a = latest.board.slice(0, y).reverse();
      const b = a.map((item) => item[x]);
      const somecoma = b.indexOf(await hogeroomId);
      const looka = b.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let i = 1; i <= somecoma; i++) {
          newBoard[y - i][x] = await hogeroomId;
        }
      }
    };
    const look_naname = async (x: number, y: number) => {
      let i = 1;
      const a = [];
      while (x + i < latest.board.length && y + i < latest.board.length) {
        a.push(latest.board[y + i][x + i]);
        i++;
      }
      const somecoma = a.indexOf(await hogeroomId);
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let j = 1; j <= somecoma; j++) {
          newBoard[y + j][x + j] = await hogeroomId;
        }
      }
    };
    const look_naname2 = async (x: number, y: number) => {
      let i = 1;
      const a = [];
      while (x - i >= 0 && y - i >= 0) {
        a.push(latest.board[y - i][x - i]);
        i++;
      }
      const somecoma = a.indexOf(await hogeroomId);
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let j = 1; j <= somecoma; j++) {
          newBoard[y - j][x - j] = await hogeroomId;
        }
      }
    };
    const look_naname3 = async (x: number, y: number) => {
      let i = 1;
      const a = [];
      while (x + i < latest.board.length && y - i >= 0) {
        a.push(latest.board[y - i][x + i]);
        i++;
      }
      const somecoma = a.indexOf(await hogeroomId);
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let j = 1; j <= somecoma; j++) {
          newBoard[y - j][x + j] = await hogeroomId;
        }
      }
    };
    const look_naname4 = async (x: number, y: number) => {
      let i = 1;
      const a = [];
      while (x - i >= 0 && y + i < latest.board.length) {
        a.push(latest.board[y + i][x - i]);
        i++;
      }
      const somecoma = a.indexOf(await hogeroomId);
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let j = 1; j <= somecoma; j++) {
          newBoard[y + j][x - j] = await hogeroomId;
        }
      }
    };

    const look_right_kouho = async (x: number, y: number) => {
      const lookside = newBoard[y].slice(x + 1, 8);
      const somecoma = lookside.indexOf(3 - (await hogeroomId));
      const looka = lookside.slice(0, somecoma);
      if (
        looka.indexOf(0) === -1 &&
        somecoma >= 1 &&
        looka.indexOf(3) === -1 &&
        looka.length >= 1
      ) {
        newBoard[y][x] = 3;
      }
    };
    const look_left_kouho = async (x: number, y: number) => {
      const lookside = newBoard[y].slice(0, x).reverse();
      const somecoma = lookside.indexOf(3 - (await hogeroomId));
      const looka = lookside.slice(0, somecoma);
      if (
        looka.indexOf(0) === -1 &&
        somecoma >= 1 &&
        looka.indexOf(3) === -1 &&
        looka.length >= 1
      ) {
        newBoard[y][x] = 3;
      }
    };
    const look_Vertical1_kouho = async (x: number, y: number) => {
      const a = newBoard.slice(y + 1, 8);
      const b = a.map((item) => item[x]);
      const somecoma = b.indexOf(3 - (await hogeroomId));
      const looka = b.slice(0, somecoma);
      if (
        looka.indexOf(0) === -1 &&
        somecoma >= 1 &&
        looka.indexOf(3) === -1 &&
        looka.length >= 1
      ) {
        newBoard[y][x] = 3;
      }
    };
    const look_Vertical2_kouho = async (x: number, y: number) => {
      const a = newBoard.slice(0, y).reverse();
      const b = a.map((item) => item[x]);
      const somecoma = b.indexOf(3 - (await hogeroomId));
      const looka = b.slice(0, somecoma);
      if (
        looka.indexOf(0) === -1 &&
        somecoma >= 1 &&
        looka.indexOf(3) === -1 &&
        looka.length >= 1
      ) {
        newBoard[y][x] = 3;
      }
    };
    const look_naname_kouho = async (x: number, y: number) => {
      let i = 1;
      const a = [];
      while (x + i < newBoard.length && y + i < newBoard.length) {
        a.push(newBoard[y + i][x + i]);
        i++;
      }
      const somecoma = a.indexOf(3 - (await hogeroomId));
      const looka = a.slice(0, somecoma);
      if (
        looka.indexOf(0) === -1 &&
        somecoma >= 1 &&
        looka.indexOf(3) === -1 &&
        looka.length >= 1
      ) {
        newBoard[y][x] = 3;
      }
    };
    const look_naname2_kouho = async (x: number, y: number) => {
      let i = 1;
      const a = [];
      while (x - i >= 0 && y - i >= 0) {
        a.push(newBoard[y - i][x - i]);
        i++;
      }
      const somecoma = a.indexOf(3 - (await hogeroomId));
      const looka = a.slice(0, somecoma);
      if (
        looka.indexOf(0) === -1 &&
        somecoma >= 1 &&
        looka.indexOf(3) === -1 &&
        looka.length >= 1
      ) {
        newBoard[y][x] = 3;
      }
    };
    const look_naname3_kouho = async (x: number, y: number) => {
      let i = 1;
      const a = [];
      while (x + i < newBoard.length && y - i >= 0) {
        a.push(newBoard[y - i][x + i]);
        i++;
      }
      const somecoma = a.indexOf(3 - (await hogeroomId));
      const looka = a.slice(0, somecoma);
      if (
        looka.indexOf(0) === -1 &&
        somecoma >= 1 &&
        looka.indexOf(3) === -1 &&
        looka.length >= 1
      ) {
        newBoard[y][x] = 3;
      }
    };
    const look_naname4_kouho = async (x: number, y: number) => {
      let i = 1;
      const a = [];
      while (x - i >= 0 && y + i < newBoard.length) {
        a.push(newBoard[y + i][x - i]);
        i++;
      }
      const somecoma = a.indexOf(3 - (await hogeroomId));
      const looka = a.slice(0, somecoma);
      if (
        looka.indexOf(0) === -1 &&
        somecoma >= 1 &&
        looka.indexOf(3) === -1 &&
        looka.length >= 1
      ) {
        newBoard[y][x] = 3;
      }
    };

    if (newTurn === hogeroomId && newBoard[y][x] === 3) {
      look_naname(x, y);
      look_naname2(x, y);
      look_naname3(x, y);
      look_naname4(x, y);
      look_right(x, y);
      look_left(x, y);
      look_Vertical1(x, y);
      look_Vertical2(x, y);
      newBoard[y][x] = hogeroomId;

      const newRoom1: RoomModel = { ...latest, board: newBoard, turn: newTurn };
      await roomsRepository.save(newRoom1);

      newBoard.forEach((row, y) => {
        row.forEach((element, x) => {
          if (element === 3) {
            newBoard[y][x] = 0;
          }
        });
      });
      console.log(newBoard);
      newBoard.forEach((row, y) => {
        row.forEach((element, x) => {
          if (element === 0) {
            look_right_kouho(x, y);
            look_left_kouho(x, y);
            look_Vertical1_kouho(x, y);
            look_Vertical2_kouho(x, y);
            look_naname_kouho(x, y);
            look_naname2_kouho(x, y);
            look_naname3_kouho(x, y);
            look_naname4_kouho(x, y);
          }
        });
      });
      newBoard[y][x] = hogeroomId;
      console.log(newBoard);
      newTurn = 3 - newTurn;
    }
    const newRoom: RoomModel = { ...latest, board: newBoard, turn: newTurn };
    await roomsRepository.save(newRoom);
    return newRoom;
  },
};
