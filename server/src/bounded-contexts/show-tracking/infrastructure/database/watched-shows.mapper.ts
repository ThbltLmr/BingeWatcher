import { WatchedShowOrmEntity } from 'src/shared-kernel/orm-entities/watched-show.orm-entity';
import { WatchedShowEntity } from '../../domain/entities/watched-show.entity';
import { Injectable } from '@nestjs/common';
import { UsersMapper } from './users.mapper';
import { ShowTrackingMapper } from './shows.mapper';

@Injectable()
export class WatchedShowsMapper {
  constructor(
    private usersMapper: UsersMapper,
    private showsMapper: ShowTrackingMapper,
  ) {}
  toEntity(watchedShowOrmEntity: WatchedShowOrmEntity): WatchedShowEntity {
    const watchedShowEntity = new WatchedShowEntity();
    watchedShowEntity.id = watchedShowOrmEntity.id;
    watchedShowEntity.user = this.usersMapper.toEntity(
      watchedShowOrmEntity.user,
    );
    watchedShowEntity.show = this.showsMapper.toEntity(
      watchedShowOrmEntity.show,
    );
    watchedShowEntity.seasonsWatched = watchedShowOrmEntity.watchedSeasons;
    return watchedShowEntity;
  }
  toOrmEntity(watchedShowEntity: WatchedShowEntity): WatchedShowOrmEntity {
    const watchedShowOrmEntity = new WatchedShowOrmEntity();
    watchedShowOrmEntity.id = watchedShowEntity.id;
    watchedShowOrmEntity.user = this.usersMapper.toOrmEntity(
      watchedShowEntity.user,
    );
    watchedShowOrmEntity.show = this.showsMapper.toOrmEntity(
      watchedShowEntity.show,
    );
    watchedShowOrmEntity.watchedSeasons = watchedShowEntity.seasonsWatched;
    return watchedShowOrmEntity;
  }
}
