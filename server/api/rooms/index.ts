import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: RoomModel | undefined;
    query?: {
      limit?: string;
    };
  };
  post: {
    resBody: RoomModel;
  };
};
