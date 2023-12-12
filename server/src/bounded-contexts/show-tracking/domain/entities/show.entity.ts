import { Genre } from '../value-objects/genre.value-object';
import { TmdbPosterUrl } from '../value-objects/tmdb-poster-url.value-object';

export class ShowEntity {
  id: number;
  title: string;
  description: string;
  posterUrl: TmdbPosterUrl;
  numberOfSeasons: number;
  tmdbId: number;
  genres: Genre[];
}
