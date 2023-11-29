import { Injectable, Inject } from '@nestjs/common';
import { WatchedShowOrmEntity } from '../../../../shared-kernel/orm-entities/watched-show.orm-entity';
import { ShowOrmEntity } from '../../../../shared-kernel/orm-entities/show.orm-entity';
import { UserOrmEntity } from '../../../../shared-kernel/orm-entities/user.orm-entity';
import { Repository } from 'typeorm';
import { CreateWatchedShowCommand } from '../commands/create-watched-show.command';
import { UsersMapper } from './users.mapper';
import { ShowTrackingMapper } from './shows.mapper';

@Injectable()
export class WatchedShowsRepository {
  constructor(
    @Inject('WATCHED_SHOW_REPOSITORY')
    private watchedShowsRepository: Repository<WatchedShowOrmEntity>,
    @Inject('SHOW_REPOSITORY')
    private showsOrmRepository: Repository<ShowOrmEntity>,
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserOrmEntity>,
    private usersMapper: UsersMapper,
    private showsMapper: ShowTrackingMapper,
  ) {}

  async create(command: CreateWatchedShowCommand) {
    const watchedShow = new WatchedShowOrmEntity();
    watchedShow.show = this.showsMapper.toOrmEntity(command.show);
    watchedShow.user = this.usersMapper.toOrmEntity(command.user);
    watchedShow.watchedSeasons = command.watchedSeasons;
    return this.watchedShowsRepository.save(watchedShow);
  }
}
