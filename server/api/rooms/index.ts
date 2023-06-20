import type { RoomModel } from "$/commonTypesWithClient/models";

export type Methods = {
  get: {
    resBody:RoomModel | null;
    query?: {
      limit?: string;
    };
  };

  post: {
    resBody: RoomModel;
  };
};
