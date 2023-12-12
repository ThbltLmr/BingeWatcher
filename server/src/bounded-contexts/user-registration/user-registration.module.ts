import { Module } from '@nestjs/common';
import { UsersRepository } from './infrastructure/database/user-registration.repository';
import { DatabaseModule } from '../../../database/database.module';
import { userProviders } from '../../shared-kernel/orm-repositories/users.orm-repository';
import { UsersController } from './interface/controllers/users.controller';
import { UserRegistrationMapper } from './infrastructure/database/user-registration.mapper';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersRepository, UserRegistrationMapper],
  exports: [UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
