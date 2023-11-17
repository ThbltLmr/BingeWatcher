import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { WatchedShowsController } from './controllers/watchedShows.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { userProviders } from '../users/entities/user.provider';
import { showProviders } from '../shows/entities/show.provider';
import { watchedShowProviders } from './entities/watchedShow.provider';
import { WatchedShowsService } from './services/watchedShows.service';
import { ShowsModule } from '../shows/shows.module';

@Module({
  imports: [DatabaseModule, JwtModule, AuthModule, UsersModule, ShowsModule],
  providers: [
    ...userProviders,
    ...showProviders,
    ...watchedShowProviders,
    WatchedShowsService,
  ],
  exports: [],
  controllers: [WatchedShowsController],
})
export class WatchedShowsModule {}
