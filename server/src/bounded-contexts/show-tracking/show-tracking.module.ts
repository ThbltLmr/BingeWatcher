import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { showProviders } from '../../shared-kernel/orm-repositories/shows.orm-repository';
import { ShowsRepository } from './infrastructure/database/shows.repository';
import { ShowsController } from './interface/controllers/shows.controller';
import { TmdbApiAdapter } from './infrastructure/tmdb-api/shows.tmdbapi.adapter';
import { TMDBAPIController } from './interface/controllers/shows.tmdbapi.controller';
import { HttpModule } from '@nestjs/axios';
import { ShowTrackingMapper } from './infrastructure/database/shows.mapper';
import { TmdbApiMapper } from './infrastructure/tmdb-api/shows.tmdbapi.mapper';
import { userProviders } from 'src/shared-kernel/orm-repositories/users.orm-repository';
import { watchedShowProviders } from 'src/shared-kernel/orm-repositories/watched-shows.orm-repository';
import { WatchedShowsController } from './interface/controllers/watched-shows.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/shared-kernel/authentication/auth.module';
import { WatchedShowsRepository } from './infrastructure/database/watched-shows.repository';
import { UsersMapper } from './infrastructure/database/users.mapper';
import { WatchedShowsMapper } from './infrastructure/database/watched-shows.mapper';

@Module({
  imports: [DatabaseModule, HttpModule, AuthModule, JwtModule],
  providers: [
    ...userProviders,
    ...watchedShowProviders,
    ...showProviders,
    ShowsRepository,
    TmdbApiAdapter,
    ShowTrackingMapper,
    TmdbApiMapper,
    WatchedShowsRepository,
    UsersMapper,
    WatchedShowsMapper,
  ],
  controllers: [ShowsController, TMDBAPIController, WatchedShowsController],
})
export class ShowTrackingModule {}
