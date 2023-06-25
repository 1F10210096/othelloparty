import { roomsRepository } from '$/repository/roomRepository';
import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query: { limit: label } = {} }) => ({
    status: 200,
    body: await roomsRepository.findLatest({ query: { limit: label } }),
  }),
  post: async () => ({ status: 201, body: await roomUsecase.create() }),
}));
