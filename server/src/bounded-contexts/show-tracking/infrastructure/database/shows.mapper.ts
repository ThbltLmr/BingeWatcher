import { ShowOrmEntity } from 'src/shared-kernel/orm-entities/show.orm-entity';
import { ShowEntity } from '../../domain/entities/show.entity';
import { Genre } from '../../domain/value-objects/genre.value-object';
import { TmdbPosterUrl } from '../../domain/value-objects/tmdb-poster-url.value-object';

export class ShowTrackingMapper {
  toOrmEntity(show: ShowEntity): ShowOrmEntity {
    const ormEntity = new ShowOrmEntity();
    ormEntity.title = show.title;
    ormEntity.description = show.description;
    ormEntity.posterURL = show.posterURL.value;
    ormEntity.numberOfSeasons = show.numberOfSeasons;
    ormEntity.tmdbId = show.tmdbId;
    ormEntity.genres = show.genres.map((genre) => genre.name);
    return ormEntity;
  }
  toEntity(showOrmEntity: ShowOrmEntity): ShowEntity {
    const show = new ShowEntity();
    show.title = showOrmEntity.title;
    show.description = showOrmEntity.description;
    show.posterURL = new TmdbPosterUrl(showOrmEntity.posterURL);
    show.numberOfSeasons = showOrmEntity.numberOfSeasons;
    show.tmdbId = showOrmEntity.tmdbId;
    show.genres = showOrmEntity.genres.map((genre) => new Genre(genre));
    return show;
  }
}
