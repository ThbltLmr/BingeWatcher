import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { showProviders } from '../shared-kernel/orm-repositories/shows.orm-repository';
import { ShowService } from './services/shows.service';
import { ShowsController } from './controllers/shows.controller';
import { TMDBAPIService } from './services/shows.tmdbapi.service';
import { TMDBAPIController } from './controllers/shows.tmdbapi.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [...showProviders, ShowService, TMDBAPIService],
  controllers: [ShowsController, TMDBAPIController],
})
export class ShowsModule {}
