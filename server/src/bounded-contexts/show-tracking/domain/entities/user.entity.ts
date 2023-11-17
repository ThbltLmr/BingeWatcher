import { WatchedShowEntity } from './watched-show.entity';

export class UserEntity {
  username: string;
  email: string;
  watchedShows: WatchedShowEntity[];
}
