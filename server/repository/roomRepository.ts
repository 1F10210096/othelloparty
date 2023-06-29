import type { RoomModel } from '$/commonTypesWithClient/models';
import { UserIdParser, roomIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Room } from '@prisma/client';
import { z } from 'zod';
const toRoomModel = (prismaRoom: Room): RoomModel => ({
  id: roomIdParser.parse(prismaRoom.roomId),
  board: z.array(z.array(z.number())).parse(prismaRoom.board),
  status: z.enum(['waiting', 'playing', 'ended']).parse(prismaRoom.status),
  created: prismaRoom.createdAt.getTime(),
  turn: prismaRoom.turn,
  blackmen: UserIdParser.parse(prismaRoom.blackmen),
  whitemen: UserIdParser.parse(prismaRoom.whitemen),
});

export const roomsRepository = {
  save: async (room: RoomModel) => {
    await prismaClient.room.upsert({
      where: { roomId: room.id },
      update: {
        status: room.status,
        board: room.board,
        turn: room.turn,
        blackmen: room.blackmen,
        whitemen: room.whitemen
      },
      create: {
        roomId: room.id,
        board: room.board,
        status: room.status,
        createdAt: new Date(room.created),
        turn: room.turn,
        blackmen: room.blackmen,
        whitemen: room.whitemen
      },
    });
  },
  findLatest: async (label: string | undefined): Promise<RoomModel | undefined> => {
    const roomlist = await prismaClient.room.findMany({
      orderBy: { createdAt: 'desc' },
    });
    const rooms = roomlist.find((room) => room.roomId === label);

    return rooms && toRoomModel(rooms);
  },
  //  getRoomInfo: async (RoomId:RoomId): Promise<RoomModel> => {
  //   const roomInfo = RoomId
  //   return roomInfo;
  // }
};
