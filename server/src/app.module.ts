import { Module } from '@nestjs/common';
import { AuthController } from './interface/controllers/auth.controller';
import { ShowsController } from './interface/controllers/shows.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AuthController, ShowsController],
  // providers: [AppService],
})
export class AppModule {}
