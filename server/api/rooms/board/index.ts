import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: { x: number; y: number; roomId: string };
    resBody: RoomModel;
  };
  get: {
    resBody: string;
  };
};
