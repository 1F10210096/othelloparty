import type { RoomModel } from '$/commonTypesWithClient/models';
import type { UserPointModel } from '$/commonTypesWithClient/models';
import { UserIdParser, roomIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import { userpoint } from '$/usecase/userColorUsecase';
import type { Room, UserPoint } from '@prisma/client';
import { z } from 'zod';
const toRoomModel = (prismaRoom: Room): RoomModel => ({
  id: roomIdParser.parse(prismaRoom.roomId),
  board: z.array(z.array(z.number())).parse(prismaRoom.board),
  status: z.enum(['waiting', 'playing', 'ended']).parse(prismaRoom.status),
  created: prismaRoom.createdAt.getTime(),
  turn: prismaRoom.turn,
  blackmen: UserIdParser.parse(prismaRoom.blackmen),
  whitemen: UserIdParser.parse(prismaRoom.whitemen),
  kansenn: prismaRoom.kansenn || [],
  knum: prismaRoom.knum,
  blackname: UserIdParser.parse(prismaRoom.blackname),
  whitename: UserIdParser.parse(prismaRoom.whitename),
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
        whitemen: room.whitemen,
        kansenn: room.kansenn,
        knum: room.knum,
        blackname: room.blackname,
        whitename: room.whitename,
      },
      create: {
        roomId: room.id,
        board: room.board,
        status: room.status,
        createdAt: new Date(room.created),
        turn: room.turn,
        blackmen: room.blackmen,
        whitemen: room.whitemen,
        kansenn: room.kansenn,
        knum: room.knum,
        blackname: room.blackname,
        whitename: room.whitename,
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
const toUserPoint = (prismaUserPoint: UserPoint): UserPoint => ({
  firebaseId: UserIdParser.parse(prismaUserPoint.firebaseId),
  userPoint: prismaUserPoint.userPoint,
});

export const userPointRepository = {
  save: async (user: UserPointModel) => {
    await prismaClient.userPoint.upsert({
      update: {
        firebaseId: user.id,
        userPoint: user.userpoint
      },
      create: {
        firebaseId: user.id,
        userPoint: user.userpoint
      },
      where: {
        firebaseId_userPoint: undefined
      }
    });
  },
};
