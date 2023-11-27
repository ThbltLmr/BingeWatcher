import { Controller, Get, Query } from '@nestjs/common';
import { TmdbApiAdapter } from '../../infrastructure/tmdb-api/shows.tmdbapi.adapter';

@Controller('tmdbapi')
export class TMDBAPIController {
  constructor(readonly tmdbApiAdapter: TmdbApiAdapter) {}

  @Get('search')
  async searchShows(@Query('tv') query: string) {
    return this.tmdbApiAdapter.searchShows(query);
  }

  @Get('show')
  async getShow(@Query('id') tmdbId: string) {
    return this.tmdbApiAdapter.getShow(tmdbId);
  }
}