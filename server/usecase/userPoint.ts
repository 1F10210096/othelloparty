import type { UserPointModel } from '$/commonTypesWithClient/models';
import { userPointRepository } from '$/repository/roomRepository';

export const userPoint = {
  create: async () => {
    const newUserPoint: UserPointModel = {
      id: 'a',
      userpoint: 1000,
    };
    await userPointRepository.save(newUserPoint);
  },
};
