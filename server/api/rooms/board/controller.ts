import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body, user, room }) => ({
    status: 201,
    body: await roomUsecase.clickBoard(body.x, body.y, user.id, room.id),
  }),
  get: () => ({ status: 200, body: '' }),
}));