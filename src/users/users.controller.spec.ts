import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
  });

  describe('GET /', () => {
    it('should get a user', () => {
      const appController = app.get<UsersController>(UsersController);
      expect(appController.get('')).not.toBeDefined();
    });
  });
});
