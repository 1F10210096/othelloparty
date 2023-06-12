import type { UserId } from "$/commonTypesWithClient/branded";
import type { RoomModel } from "$/commonTypesWithClient/models";
import { roomsRepository } from "$/repository/roomRepository";
import { roomIdParser } from "$/service/idParsers"
import { randomUUID } from "crypto"
import { userColorUsecase } from "./userColorUsecase";
import assert from "assert";
const initBoard = () => [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,1,2,0,0,0],
  [0,0,0,2,1,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]
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
  clickBoard: async (x: number, y:number, userId:UserId): Promise<RoomModel> => {
    const latest = await roomsRepository.findLatest()

    assert(latest, 'クリック出来てるんだからRoomが無いわけがない')

    const newBoard:number[][] = JSON.parse(JSON.stringify(latest.board))
    newBoard[y][x] = userColorUsecase.getUserColor(userId);

    const newRoom:RoomModel = { ...latest, board: newBoard };

    await roomsRepository.save(newRoom);

    return newRoom;
  },
};