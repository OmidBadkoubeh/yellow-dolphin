import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerService } from '@/logger/logger.service';

import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, LoggerService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
