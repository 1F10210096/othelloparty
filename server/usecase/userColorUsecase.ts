import type { UserId } from '$/commonTypesWithClient/branded';
import type { UserModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomRepository';
import assert from 'assert';
export const userColorUsecase = {
  getUserColor: async (userID: UserId, roomID: string): Promise<number> => {
    const room = await roomsRepository.findLatest(roomID);
    assert(room, 'クリック出来てるんだからRoomが無いわけがない');
    console.log(roomID);
    if (room.blackmen === userID) {
      return 1;
    } else if (room.whitemen === userID) {
      return 2;
    } else if (room.blackmen === 'a') {
      room.blackmen = userID;
      await roomsRepository.save(room);
      return 1;
    } else if (room.whitemen === 'a') {
      room.whitemen = userID;
      await roomsRepository.save(room);
      return 2;
    } else {
      if (room.kansenn.includes(userID)) {
        // ユーザーIDがすでにリストに存在する場合の処理
        console.log('ユーザーIDは既にリストに存在します');
        return 4;
      } else {
        room.kansenn.push(userID);
        room.knum = room.kansenn.length;
        await roomsRepository.save(room);
        console.log(room);
        return 5;
      }
    }
  },
};

export const username = {
  getusername: async (userModel: UserModel, roomID: string): Promise<string> => {
    const room = await roomsRepository.findLatest(roomID);
    assert(room, 'クリック出来てるんだからroomが無いわけがない');
    console.log(userModel);
    console.log(userModel.displayName);
    if (room.blackname === userModel.displayName) {
      return username as unknown as string;
    } else if (room.whitename === userModel.displayName) {
      return username as unknown as string;
    } else if (room.blackname === 'あなた') {
      room.blackname = userModel.displayName as string;
      await roomsRepository.save(room);
      return room.blackname;
    } else {
      room.whitename = userModel.displayName as string;
      await roomsRepository.save(room);
      return room.whitename;
    }
  },
};
