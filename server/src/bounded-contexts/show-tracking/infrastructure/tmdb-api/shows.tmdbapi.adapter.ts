import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TmdbApiAdapter {
  tmdbAPIKey: string;
  tmdbAPIURL: string;
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.tmdbAPIKey = this.configService.get<string>('TMDB_API_KEY');
    this.tmdbAPIURL = this.configService.get<string>('TMDB_API_URL');
  }

  // TODO: change genres_ids to genre names (string[])
  async searchShows(query: string) {
    const response = await this.httpService.axiosRef.get(
      `${this.tmdbAPIURL}/search/tv?api_key=${this.tmdbAPIKey}&query=${query}`,
    );
    return response.data.results;
  }

  async getShow(tmdbId: string) {
    const response = await this.httpService.axiosRef.get(
      `${this.tmdbAPIURL}/tv/${tmdbId}?api_key=${this.tmdbAPIKey}`,
    );
    return response.data;
  }
}
