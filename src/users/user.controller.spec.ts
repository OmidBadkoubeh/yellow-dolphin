import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
  });

  describe('GET /', () => {
    it('should get a user', () => {
      const appController = app.get<UserController>(UserController);
      expect(appController.get('')).not.toBeDefined();
    });
  });
});
