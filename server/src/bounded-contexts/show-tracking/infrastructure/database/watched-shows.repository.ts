import { Injectable, Inject } from '@nestjs/common';
import { WatchedShowOrmEntity } from '../../../../shared-kernel/orm-entities/watched-show.orm-entity';
import { ShowOrmEntity } from '../../../../shared-kernel/orm-entities/show.orm-entity';
import { UserOrmEntity } from '../../../../shared-kernel/orm-entities/user.orm-entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchedShowsRepository {
  constructor(
    @Inject('WATCHED_SHOW_REPOSITORY')
    private watchedShowsRepository: Repository<WatchedShowOrmEntity>,
    @Inject('SHOW_REPOSITORY')
    private showsOrmRepository: Repository<ShowOrmEntity>,
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserOrmEntity>,
  ) {}

  async addWatchedShow(
    userId: number,
    showtmdbId: number,
    numberOfSeasonsWatched: number,
  ) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    const show = await this.showsOrmRepository.findOne({
      where: {
        tmdbId: showtmdbId,
      },
    });
    if (!show) {
      //TODO: create show
    }
    const watchedShow = new WatchedShowOrmEntity();
    watchedShow.user = user;
    watchedShow.show = show;
    watchedShow.watchedSeasons = numberOfSeasonsWatched;
    return this.watchedShowsRepository.save(watchedShow);
  }
}
