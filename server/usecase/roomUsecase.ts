import type { UserId } from "$/commonTypesWithClient/branded";
import type { RoomModel } from "$/commonTypesWithClient/models";
import { roomsRepository } from "$/repository/roomRepository";
import { roomIdParser } from "$/service/idParsers"
import { randomUUID } from "crypto"
import { userColorUsecase } from "./userColorUsecase";
import assert from "assert";
const initBoard = () => [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 3, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 3, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]
let playerColor = 1;
export const roomUsecase = {
  create: async () => {
    const newRoom: RoomModel = {
      id: roomIdParser.parse(randomUUID()),
      board: initBoard(),
      status: 'waiting',
      created: Date.now(),
    }
    await roomsRepository.save(newRoom);
    return newRoom;
  },
  //clicksyori
  
  clickBoard: async (x: number, y:number, userId:UserId): Promise<RoomModel> => {
    const latest = await roomsRepository.findLatest()


    assert(latest, 'クリック出来てるんだからRoomが無いわけがない')

    const newBoard:number[][] = JSON.parse(JSON.stringify(latest.board))

    
    const look_right = (x: number, y: number, userId: UserId) => {
      const lookside = latest.board[y].slice(x + 1, 8);
      const somecoma = lookside.indexOf(userColorUsecase.getUserColor(userId));
      const looka = lookside.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let i = 1; i <= somecoma; i++) {
          newBoard[y][x + i] = userColorUsecase.getUserColor(userId);
        }
      }
      return newBoard;
    };
    const look_left = (x: number, y: number, userId: UserId) => {
      const lookside = latest.board[y].slice(0, x).reverse();
      const somecoma = lookside.indexOf(userColorUsecase.getUserColor(userId));
      const looka = lookside.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let i = 1; i <= somecoma; i++) {
          newBoard[y][x - i] = userColorUsecase.getUserColor(userId);
        }
      }
      return newBoard;
    };

    const look_Vertical1 = (x: number, y: number, userId: UserId) => {
      const a = latest.board.slice(y + 1, 8);
      const b = a.map((item) => item[x]);
      const somecoma = b.indexOf(userColorUsecase.getUserColor(userId));
      const looka = b.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let i = 1; i <= somecoma; i++) {
          newBoard[y + i][x] = userColorUsecase.getUserColor(userId);
        }
      }
    };
    const look_Vertical2 = (x: number, y: number, userId: UserId) => {
      const a = latest.board.slice(0, y).reverse();
      const b = a.map((item) => item[x]);
      const somecoma = b.indexOf(userColorUsecase.getUserColor(userId));
      const looka = b.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let i = 1; i <= somecoma; i++) {
          newBoard[y - i][x] = userColorUsecase.getUserColor(userId);
        }
      }
    };
    const look_naname = (x: number, y: number, userId: UserId) => {
      let i = 1;
      const a = [];
      while (x + i < latest.board.length && y + i < latest.board.length) {
        a.push(latest.board[y + i][x + i]);
        i++;
      }
      const somecoma = a.indexOf(userColorUsecase.getUserColor(userId));
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let j = 1; j <= somecoma; j++) {
          newBoard[y + j][x + j] = userColorUsecase.getUserColor(userId);
        }
      }
    };
    const look_naname2 = (x: number, y: number, userId: UserId) => {
      let i = 1;
      const a = [];
      while (x - i >= 0 && y - i >= 0) {
        a.push(latest.board[y - i][x - i]);
        i++;
      }
      const somecoma = a.indexOf(userColorUsecase.getUserColor(userId));
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let j = 1; j <= somecoma; j++) {
          newBoard[y - j][x - j] = userColorUsecase.getUserColor(userId);
        }
      }
    };
    const look_naname3 = (x: number, y: number, userId: UserId) => {
      let i = 1;
      const a = [];
      while (x + i < latest.board.length && y - i >= 0) {
        a.push(latest.board[y - i][x + i]);
        i++;
      }
      const somecoma = a.indexOf(userColorUsecase.getUserColor(userId));
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let j = 1; j <= somecoma; j++) {
          newBoard[y - j][x + j] = userColorUsecase.getUserColor(userId);
        }
      }
    };
    const look_naname4 = (x: number, y: number, userId: UserId) => {
      let i = 1;
      const a = [];
      while (x - i >= 0 && y + i < latest.board.length) {
        a.push(latest.board[y + i][x - i]);
        i++;
      }
      const somecoma = a.indexOf(userColorUsecase.getUserColor(userId));
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1) {
        for (let j = 1; j <= somecoma; j++) {
          newBoard[y + j][x - j] = userColorUsecase.getUserColor(userId);
        }
      }
    };

    const look_right_kouho = (x: number, y: number,userId: UserId) => {
      const lookside = newBoard[y].slice(x + 1, 8);
      const somecoma = lookside.indexOf(3-userColorUsecase.getUserColor(userId));
      const looka = lookside.slice(0, somecoma);
      if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
        newBoard[y][x] = 3;
      }
    };
    const look_left_kouho = (x: number, y: number, userId: UserId) => {
      const lookside = newBoard[y].slice(0, x).reverse();
      const somecoma = lookside.indexOf(3-userColorUsecase.getUserColor(userId));
      const looka = lookside.slice(0, somecoma);
      if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
        newBoard[y][x] = 3;
      }
    };
    const look_Vertical1_kouho = (x: number, y: number, userId: UserId) => {
      const a = newBoard.slice(y + 1, 8);
      const b = a.map((item) => item[x]);
      const somecoma = b.indexOf(3-userColorUsecase.getUserColor(userId));
      const looka = b.slice(0, somecoma);
      if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
        newBoard[y][x] = 3;
      }
    };
    const look_Vertical2_kouho = (x: number, y: number, userId: UserId) => {
      const a = newBoard.slice(0, y).reverse();
      const b = a.map((item) => item[x]);
      const somecoma = b.indexOf(3-userColorUsecase.getUserColor(userId));
      const looka = b.slice(0, somecoma);
      if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
        newBoard[y][x] = 3;
      }
    };
    const look_naname_kouho = (x: number, y: number, userId: UserId) => {
      let i = 1;
      const a = [];
      while (x + i < newBoard.length && y + i < newBoard.length) {
        a.push(newBoard[y + i][x + i]);
        i++;
      }
      const somecoma = a.indexOf(3-userColorUsecase.getUserColor(userId));
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
        newBoard[y][x] = 3;
      }
    };
    const look_naname2_kouho = (x: number, y: number, userId: UserId) => {
      let i = 1;
      const a = [];
      while (x - i >= 0 && y - i >= 0) {
        a.push(newBoard[y - i][x - i]);
        i++;
      }
      const somecoma = a.indexOf(3-userColorUsecase.getUserColor(userId));
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
        newBoard[y][x] = 3;
      }
    };
    const look_naname3_kouho = (x: number, y: number, userId: UserId) => {
      let i = 1;
      const a = [];
      while (x + i < newBoard.length && y - i >= 0) {
        a.push(newBoard[y - i][x + i]);
        i++;
      }
      const somecoma = a.indexOf(3-userColorUsecase.getUserColor(userId));
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
        newBoard[y][x] = 3;
      }
    };
    const look_naname4_kouho = (x: number, y: number, userId: UserId) => {
      let i = 1;
      const a = [];
      while (x - i >= 0 && y + i < newBoard.length) {
        a.push(newBoard[y + i][x - i]);
        i++;
      }
      const somecoma = a.indexOf(3-userColorUsecase.getUserColor(userId));
      const looka = a.slice(0, somecoma);
      if (looka.indexOf(0) === -1 && somecoma >= 1 && looka.indexOf(3) === -1 && looka.length >= 1) {
        newBoard[y][x] = 3;
      }
    };

    const newRoom:RoomModel = { ...latest, board: newBoard };


    if (newBoard[y][x] !== 0 && newBoard[y][x] !== 3) {
      await roomsRepository.save(newRoom);
    return newRoom;
    }

    if (newBoard[y][x] !== 3) {
      await roomsRepository.save(newRoom);

    return newRoom;
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

      newBoard[y][x] = userColorUsecase.getUserColor(userId);

      newBoard.forEach((row, y) => {
        row.forEach((element, x) => {
          if (element === 3) {
            newBoard[y][x] = 0;
          }
        });
      });
      newBoard.forEach((row, y) => {
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
      let a = 0
      newBoard.forEach((row, y) => {
        row.forEach((element, x) => {
          if (element === 3) {
            a =a + 1
          }
        });
      });
      if (a>=1){
          await roomsRepository.save(newRoom);
        return newRoom;
        }
      }
    newBoard[y][x] = userColorUsecase.getUserColor(userId);
  playerColor = 3 - userColorUsecase.getUserColor(userId); 
    await roomsRepository.save(newRoom);
    return newRoom;
  },
};