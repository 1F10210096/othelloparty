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
  map(arg0: (label: any) => any): unknown;
  label(label: any): unknown;
  id:RoomId;
  board: number[][];
  status:'waiting' | 'playing' | 'ended';
  created:number;
  
}