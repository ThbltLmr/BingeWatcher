import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { showProviders } from '../../shared-kernel/orm-repositories/shows.orm-repository';
import { ShowsRepository } from './infrastructure/database/shows.repository';
import { ShowsController } from '../../shows/controllers/shows.controller';
import { TMDBAPIService } from './infrastructure/tmdb-api/shows.tmdbapi.adapter';
import { TMDBAPIController } from '../../shows/controllers/shows.tmdbapi.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [...showProviders, ShowsRepository, TMDBAPIService],
  controllers: [ShowsController, TMDBAPIController],
})
export class ShowsModule {}
