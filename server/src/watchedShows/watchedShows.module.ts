import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WatchedShowsController } from './controllers/watchedShows.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { userProviders } from 'src/users/user.provider';
import { showProviders } from 'src/shows/show.provider';
import { watchedShowProviders } from './entities/watchedShow.provider';
import { WatchedShowsService } from './services/watchedShows.service';
import { ShowsModule } from 'src/shows/shows.module';

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
