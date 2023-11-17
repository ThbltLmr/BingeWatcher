import { Injectable, Inject } from '@nestjs/common';
import { WatchedShow } from '../../shared-kernel/orm-entities/watched-show.orm-entity';
import { Show } from '../../shared-kernel/orm-entities/show.orm-entity';
import { User } from '../../shared-kernel/orm-entities/user.orm-entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchedShowsService {
  constructor(
    @Inject('WATCHED_SHOW_REPOSITORY')
    private watchedShowsRepository: Repository<WatchedShow>,
    @Inject('SHOW_REPOSITORY')
    private showsRepository: Repository<Show>,
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
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
    const show = await this.showsRepository.findOne({
      where: {
        tmdbId: showtmdbId,
      },
    });
    if (!show) {
      //TODO: create show
    }
    const watchedShow = new WatchedShow();
    watchedShow.user = user;
    watchedShow.show = show;
    watchedShow.watchedSeasons = numberOfSeasonsWatched;
    return this.watchedShowsRepository.save(watchedShow);
  }
}
