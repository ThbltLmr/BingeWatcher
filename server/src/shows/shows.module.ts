import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { showProviders } from './show.provider';
import { ShowService } from './show.service';
import { ShowsController } from './shows.controller';
import { TMDBAPIService } from './show.tmdbapi.service';
import { TMDBAPIController } from './shows.tmdbapi.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...showProviders, ShowService, TMDBAPIService],
  controllers: [ShowsController, TMDBAPIController],
})
export class ShowsModule {}
