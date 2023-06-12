import type {RoomModel} from '$/commonTypesWithClient/models'
import { roomRepository } from '$/api/repository/roomsRepository';
import { roomIdParser } from "$/service/idParsers"
import { randomUUID } from 'crypto';
import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorUsecase } from './userColorUsecase';
import { constants } from 'buffer';
import assert from 'assert';
const initBoard = ()=> [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
export const roomUsecase = {
  create: async ():Promise<RoomModel> => {
    const newRoom: RoomModel = {
      id: roomIdParser.parse(randomUUID()),
      board:initBoard(),
      status:'waiting',
      created: Date.now(),
    };

    await roomRepository.save(newRoom);

    return newRoom
  },
  clickBoard: async (x:number,y:number, userId: UserId): Promise<RoomModel>=> {
    const latest = await roomRepository.findLatest()
    assert(latest, 'くっりく出来てるんだからRoomがないわけがない')

    const newBoard:number[][] = JSON.parse(JSON.stringify(latest.board));
    newBoard[y][x]=userColorUsecase.getUserColor(userId);
    const newRoom:RoomModel = {...latest,board:newBoard};
    await roomRepository.save(newRoom)
    return newRoom
  }
}