import type { RoomModel } from '$/commonTypesWithClient/models';
type Methods = {
  get: {
    query?: {
      limit?: string;
    };
    response: {
      resBody: RoomModel;
    };
  };
  post: {
    response: {
      resBody: RoomModel;
    };
  };
};
