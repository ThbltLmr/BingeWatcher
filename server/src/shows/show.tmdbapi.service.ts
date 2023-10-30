import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// TODO: set-up Axios

@Injectable()
export class TMDBAPIService {
  constructor(private configService: ConfigService) {}

  async searchShows(query: string) {
    console.log(query);
    // const tmdbAPIKey = this.configService.get<string>('TMDB_API_KEY');
    // const tmdbAPIURL = this.configService.get<string>('TMDB_API_URL');
    // const response = await fetch(
    //   `${tmdbAPIURL}/search/tv?api_key=${tmdbAPIKey}&query=${query}`,
    // );
    // const responseJSON = await response.json;
    // return responseJSON;
  }
}
