import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
    }).compile();
  });

  describe('GET /', () => {
    it('should get a user', () => {
      const appController = app.get<UserController>(UserController);
      expect(appController.get('')).not.toBeDefined();
    });
  });
});
