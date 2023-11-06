import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WatchedShowsController } from './watchedShows.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, JwtModule, AuthModule, UsersModule],
  providers: [],
  exports: [],
  controllers: [WatchedShowsController],
})
export class WatchedShowsModule {}
