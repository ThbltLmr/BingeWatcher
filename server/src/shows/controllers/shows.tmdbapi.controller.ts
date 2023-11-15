import { Controller, Get, Query } from '@nestjs/common';
import { TMDBAPIService } from '../services/shows.tmdbapi.service';

@Controller('tmdbapi')
export class TMDBAPIController {
  constructor(readonly TMDBAPIservice: TMDBAPIService) {}

  @Get('search')
  async searchShows(@Query('tv') query: string) {
    return this.TMDBAPIservice.searchShows(query);
  }

  @Get('show')
  async getShow(@Query('id') tmdbId: string) {
    return this.TMDBAPIservice.getShow(tmdbId);
  }
}
