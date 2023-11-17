import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { WatchedShowsController } from './controllers/watchedShows.controller';
import { AuthModule } from '../shared-kernel/authentication/auth.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { userProviders } from '../shared-kernel/orm-repositories/users.orm-repository';
import { showProviders } from '../shared-kernel/orm-repositories/shows.orm-repository';
import { watchedShowProviders } from '../shared-kernel/orm-repositories/watched-shows.orm-repository';
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
