import { Module } from '@nestjs/common';
import { UsersService } from './infrastructure/database/user-registration.repository';
import { DatabaseModule } from '../../../database/database.module';
import { userProviders } from '../../shared-kernel/orm-repositories/users.orm-repository';
import { UsersController } from './interface/controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
