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

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [
    ...showProviders,
    ShowsRepository,
    TmdbApiAdapter,
    ShowTrackingMapper,
    TmdbApiMapper,
  ],
  controllers: [ShowsController, TMDBAPIController],
})
export class ShowsModule {}
