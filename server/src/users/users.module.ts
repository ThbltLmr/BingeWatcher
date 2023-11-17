import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from '../shared-kernel/orm-repositories/users.orm-repository';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
