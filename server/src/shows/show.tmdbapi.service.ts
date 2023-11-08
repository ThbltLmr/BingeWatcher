import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TMDBAPIService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async searchShows(query: string) {
    const tmdbAPIKey = this.configService.get<string>('TMDB_API_KEY');
    const tmdbAPIURL = this.configService.get<string>('TMDB_API_URL');
    const response = await this.httpService.axiosRef.get(
      `${tmdbAPIURL}/search/tv?api_key=${tmdbAPIKey}&query=${query}`,
    );
    return response.data.results;
  }

  async getShow(tmdbId: string) {
    const tmdbAPIKey = this.configService.get<string>('TMDB_API_KEY');
    const tmdbAPIURL = this.configService.get<string>('TMDB_API_URL');
    const response = await this.httpService.axiosRef.get(
      `${tmdbAPIURL}/tv/${tmdbId}?api_key=${tmdbAPIKey}`,
    );
    return response.data;
  }
}
