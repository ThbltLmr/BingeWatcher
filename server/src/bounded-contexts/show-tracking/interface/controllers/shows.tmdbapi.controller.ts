import { Controller, Get, Query } from '@nestjs/common';
import { TmdbApiAdapter } from '../../infrastructure/tmdb-api/shows.tmdbapi.adapter';
import { SearchQueryDto } from '../dtos/search-query.dto';
import { GetShowDetailsQuery } from '../../infrastructure/queries/get-show-details.query';

// Abstracting the TMDB API to avoid exposing API keys in front-end
@Controller('tmdbapi')
export class TMDBAPIController {
  constructor(readonly tmdbApiAdapter: TmdbApiAdapter) {}

  @Get('search')
  async searchShows(@Query('tv') query: string) {
    const dto = new SearchQueryDto();
    dto.query = query;
    return this.tmdbApiAdapter.searchShows(dto);
  }

  @Get('show')
  async getShow(@Query('id') tmdbId: string) {
    const query = new GetShowDetailsQuery();
    query.tmdbId = parseInt(tmdbId);
    return this.tmdbApiAdapter.getShow(query);
  }
}
