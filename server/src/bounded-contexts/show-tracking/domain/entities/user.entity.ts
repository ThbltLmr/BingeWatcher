import { WatchedShowEntity } from './watched-show.entity';

export class UserEntity {
  id: number;
  username: string;
  email: string;
  watchedShows: WatchedShowEntity[];
}
