import { ShowEntity } from './show.entity';
import { UserEntity } from './user.entity';

export class WatchedShowEntity {
  id: number;
  show: ShowEntity;
  user: UserEntity;
  seasonsWatched: number;

  validate() {
    if (!this.show) {
      throw new Error('Show is required');
    }

    if (!this.user) {
      throw new Error('User is required');
    }

    if (this.seasonsWatched > this.show.numberOfSeasons) {
      throw new Error(
        'Seasons watched cannot be more than total number of seasons',
      );
    }
  }
}
