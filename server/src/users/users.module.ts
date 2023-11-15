import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './entities/user.provider';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
