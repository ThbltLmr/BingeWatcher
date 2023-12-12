import { ShowEntity } from '../../domain/entities/show.entity';
import { UserEntity } from '../../domain/entities/user.entity';

export class CreateWatchedShowCommand {
  user: UserEntity;
  show: ShowEntity;
  watchedSeasons: number;
}
