import type { UserId } from '$/commonTypesWithClient/branded';
import { roomsRepository } from '$/repository/roomRepository';
import assert from 'assert';

export const userColorUsecase = {
  getUserColor: async (userID: UserId, roomID: string): Promise<number> => {
    const room = await roomsRepository.findLatest(roomID);
    assert(room, 'クリック出来てるんだからRoomが無いわけがない');

    if (room.blackmen === userID) {
      return 1;
    } else if (room.whitemen=== userID) {
      return 2;
    } else if (room.blackmen === 'a') {
      room.blackmen = userID;
      await roomsRepository.save(room);
      return 1;

    } else {
      room.whitemen = userID;
      await roomsRepository.save(room);
      return 2;
    }
  },
};
