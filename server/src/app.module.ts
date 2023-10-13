import { Module } from '@nestjs/common';
import { ShowsController } from './interface/controllers/shows.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot()],
  controllers: [ShowsController],
  // providers: [AppService],
})
export class AppModule {}
