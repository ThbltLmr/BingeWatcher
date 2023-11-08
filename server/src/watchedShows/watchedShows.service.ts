import { Injectable, Inject } from '@nestjs/common';
import { WatchedShow } from './watchedShow.entity';
import { Show } from 'src/shows/show.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchedShowsService {
  constructor(
    @Inject('WATCHED_SHOWS_REPOSITORY')
    private watchedShowsRepository: Repository<WatchedShow>,
    @Inject('SHOWS_REPOSITORY')
    private showsRepository: Repository<Show>,
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async addWatchedShow(userId: number, showtmdbId: number) {
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
    return this.watchedShowsRepository.save(watchedShow);
  }
}
