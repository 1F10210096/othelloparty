import type { RoomId, TaskId, UserId } from './branded';

export type UserModel = {
  id: UserId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
};

export type TaskModel = {
  id: TaskId;
  label: string;
  done: boolean;
  created: number;
};

export type RoomModel = {
  id: RoomId;
  board: number[][];
  status: 'waiting' | 'playing' | 'ended';
  created: number;
  turn: number;
  blackmen: string;
  whitemen: string;
  kansenn: string[];
  knum: number;
  blackname: string;
  whitename: string;
};

export type UserPointModel = {
  id: string;
  userpoint: number;
};
