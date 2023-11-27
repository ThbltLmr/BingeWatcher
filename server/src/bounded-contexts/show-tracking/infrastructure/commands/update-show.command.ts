import { Genre } from '../../domain/value-objects/genre.value-object';
import { TmdbPosterUrl } from '../../domain/value-objects/tmdb-poster-url.value-object';

export class UpdateShowCommand {
  id: number;
  title: string;
  description: string;
  posterUrl: TmdbPosterUrl;
  numberOfSeasons: number;
  tmdbId: number;
  genres: Genre[];
}
