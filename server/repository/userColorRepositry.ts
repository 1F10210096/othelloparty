import type { UserId } from '$/commonTypesWithClient/branded';

const userColorDict: { black?: UserId; white?: UserId } = {};
export const userColorRepository = {
  getUserColor: (userID: UserId): number => {
    if (userColorDict.black === userID) {
      return 1;
    } else if (userColorDict.white === userID) {
      return 2;
    } else if (userColorDict.black === undefined) {
      userColorDict.black = userID;
      return 1;
    } else {
      userColorDict.white = userID;
      return 2;
    }
  },
};
