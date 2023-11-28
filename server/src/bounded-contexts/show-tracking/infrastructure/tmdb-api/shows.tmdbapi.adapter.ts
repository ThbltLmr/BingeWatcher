import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchQueryDto } from '../../interface/dtos/search-query.dto';
import { GetShowDetailsQuery } from '../queries/get-show-details.query';
import { TmdbApiMapper } from './shows.tmdbapi.mapper';

@Injectable()
export class TmdbApiAdapter {
  tmdbAPIKey: string;
  tmdbAPIURL: string;
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly tmdbApiMapper: TmdbApiMapper,
  ) {
    this.tmdbAPIKey = this.configService.get<string>('TMDB_API_KEY');
    this.tmdbAPIURL = this.configService.get<string>('TMDB_API_URL');
  }

  // TODO: change genres_ids to genre names (string[])
  async searchShows(query: SearchQueryDto) {
    const response = await this.httpService.axiosRef.get(
      `${this.tmdbAPIURL}/search/tv?api_key=${this.tmdbAPIKey}&query=${query.query}`,
    );
    const results = response.data.results;
    return this.tmdbApiMapper.SearchResultsToEntities(results);
  }

  async getShow(query: GetShowDetailsQuery) {
    const response = await this.httpService.axiosRef.get(
      `${this.tmdbAPIURL}/tv/${query.tmdbId}?api_key=${this.tmdbAPIKey}`,
    );
    return this.tmdbApiMapper.ShowDetailsToEntity(response.data);
  }
}
