import { Injectable, Inject } from '@nestjs/common';
import { WatchedShowOrmEntity } from '../../../../shared-kernel/orm-entities/watched-show.orm-entity';
import { ShowOrmEntity } from '../../../../shared-kernel/orm-entities/show.orm-entity';
import { UserOrmEntity } from '../../../../shared-kernel/orm-entities/user.orm-entity';
import { Repository } from 'typeorm';
import { CreateWatchedShowCommand } from '../commands/create-watched-show.command';
import { UsersMapper } from './users.mapper';
import { ShowTrackingMapper } from './shows.mapper';
import { GetUserWatchedShowsQuery } from '../queries/get-user-watched-shows.query';
import { WatchedShowsMapper } from './watched-shows.mapper';
import { UpdateWatchedShowCommand } from '../commands/update-watched-show.command';

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
    private watchedShowsMapper: WatchedShowsMapper,
    private showsMapper: ShowTrackingMapper,
  ) {}

  async findAll() {
    return this.watchedShowsRepository.find({
      relations: ['user', 'show'],
    });
  }

  async create(command: CreateWatchedShowCommand) {
    const watchedShow = new WatchedShowOrmEntity();
    watchedShow.show = this.showsMapper.toOrmEntity(command.show);
    watchedShow.user = this.usersMapper.toOrmEntity(command.user);
    watchedShow.watchedSeasons = command.watchedSeasons;
    return this.watchedShowsRepository.save(watchedShow);
  }

  async findUserWatchedShows(query: GetUserWatchedShowsQuery) {
    const userOrmEntity = await this.usersRepository.findOne({
      where: {
        id: query.user.id,
      },
    });

    const WatchedShowsOrmEntities = await this.watchedShowsRepository.find({
      where: {
        user: userOrmEntity as any,
      },
      relations: ['user', 'show'],
    });

    const watchedShowsEntities = WatchedShowsOrmEntities.map((ormEntity) => {
      return this.watchedShowsMapper.toEntity(ormEntity);
    });
    return watchedShowsEntities;
  }

  async update(command: UpdateWatchedShowCommand) {
    const watchedShowOrmEntity = await this.watchedShowsRepository.findOne({
      where: {
        id: command.watchedShow.id,
      },
    });
    watchedShowOrmEntity.watchedSeasons = command.watchedShow.seasonsWatched;
    return this.watchedShowsRepository.update(
      command.watchedShow.id,
      watchedShowOrmEntity,
    );
  }
}
