import { Genre } from '../value-objects/genre.value-object';
import { TmdbPosterUrl } from '../value-objects/tmdb-poster-url.value-object';

export class ShowEntity {
  title: string;
  description: string;
  posterURL: TmdbPosterUrl;
  numberOfSeasons: number;
  tmdbId: number;
  genres: Genre[];
}
