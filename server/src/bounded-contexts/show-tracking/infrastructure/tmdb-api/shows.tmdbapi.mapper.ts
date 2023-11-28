import { ConfigService } from '@nestjs/config';
import { ShowEntity } from '../../domain/entities/show.entity';
import { TmdbPosterUrl } from '../../domain/value-objects/tmdb-poster-url.value-object';
import { HttpService } from '@nestjs/axios';
import { Genre } from '../../domain/value-objects/genre.value-object';

export class TmdbApiMapper {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}
  async SearchResultsToEntities(results: any): Promise<ShowEntity[]> {
    const showEntities = results.map(async (result: any) => {
      const showEntity = new ShowEntity();
      showEntity.tmdbId = result.id;
      showEntity.title = result.original_name;
      showEntity.description = result.overview;
      showEntity.posterURL = new TmdbPosterUrl(
        this.configService.get<string>('TMDB_API_IMAGE_URL') +
          result.poster_path,
      );
      showEntity.numberOfSeasons = await this.getShowNumberofSeasons(result.id);
      showEntity.genres = await this.getShowGenres(result.id);
      return showEntity;
    });
    return showEntities;
  }

  ShowDetailsToEntity(result: any): ShowEntity {
    const showEntity = new ShowEntity();
    showEntity.tmdbId = result.id;
    showEntity.title = result.original_name;
    showEntity.description = result.overview;
    showEntity.posterURL = new TmdbPosterUrl(
      this.configService.get<string>('TMDB_API_IMAGE_URL') + result.poster_path,
    );
    showEntity.numberOfSeasons = result.number_of_seasons;
    showEntity.genres = result.genres.map((genre: any) => {
      return new Genre(genre.name);
    });
    return showEntity;
  }

  private async getShowNumberofSeasons(tmdbId: number): Promise<number> {
    const response = await this.httpService.axiosRef.get(
      `${this.configService.get<string>(
        'TMDB_API_URL',
      )}/tv/${tmdbId}?api_key=${this.configService.get<string>(
        'TMDB_API_KEY',
      )}`,
    );
    return response.data.number_of_seasons;
  }

  private async getShowGenres(tmdbId: number): Promise<Genre[]> {
    const response = await this.httpService.axiosRef.get(
      `${this.configService.get<string>(
        'TMDB_API_URL',
      )}/tv/${tmdbId}?api_key=${this.configService.get<string>(
        'TMDB_API_KEY',
      )}`,
    );
    const genres = response.data.genres.map((genre: any) => {
      return new Genre(genre.name);
    });
    return genres;
  }
}
