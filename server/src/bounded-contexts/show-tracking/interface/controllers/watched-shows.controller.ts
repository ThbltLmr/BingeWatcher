import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../../shared-kernel/authentication/guards/auth.guard';
import { AuthService } from '../../../../shared-kernel/authentication/services/auth.service';
import { WatchedShowsRepository } from '../../infrastructure/database/watched-shows.repository';
import { WatchedShowDataDto } from '../dtos/watched-show-data.dto';
import { Repository } from 'typeorm';
import { UserOrmEntity } from 'src/shared-kernel/orm-entities/user.orm-entity';
import { UsersMapper } from '../../infrastructure/database/users.mapper';
import { ShowOrmEntity } from 'src/shared-kernel/orm-entities/show.orm-entity';
import { ShowsRepository } from '../../infrastructure/database/shows.repository';
import { CreateShowCommand } from '../../infrastructure/commands/create-show.command';
import { TmdbApiAdapter } from '../../infrastructure/tmdb-api/shows.tmdbapi.adapter';
import { CreateWatchedShowCommand } from '../../infrastructure/commands/create-watched-show.command';
import { ShowTrackingMapper } from '../../infrastructure/database/shows.mapper';

// TODO
@Controller('watchedshows')
export class WatchedShowsController {
  constructor(
    private authService: AuthService,
    private watchedShowsSRepository: WatchedShowsRepository,
    private usersMapper: UsersMapper,
    private usersOrmRepository: Repository<UserOrmEntity>,
    private showsOrmRepository: Repository<ShowOrmEntity>,
    private showsRepository: ShowsRepository,
    private tmdbApiAdapter: TmdbApiAdapter,
    private showsMapper: ShowTrackingMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Post('add')
  async addWatchedShow(
    @Request() req,
    @Body() watchedShowData: WatchedShowDataDto,
  ) {
    const userId = req.user.sub;
    const userOrmEntity = await this.usersOrmRepository.findOne({
      where: {
        id: userId,
      },
    });
    const userEntity = this.usersMapper.toEntity(userOrmEntity);
    let show = await this.showsOrmRepository
      .findOne({
        where: {
          tmdbId: watchedShowData.tmdbId,
        },
      })
      .then((show) => this.showsMapper.toEntity(show));

    if (!show) {
      const createShowCommand: CreateShowCommand =
        await this.createShowCommandFromTmdbId(watchedShowData.tmdbId);
      const showOrmEntity =
        await this.showsRepository.create(createShowCommand);
      show = this.showsMapper.toEntity(showOrmEntity);
    }

    const createWatchedShowCommand: CreateWatchedShowCommand = {
      user: userEntity,
      show: show,
      watchedSeasons: watchedShowData.numberOfSeasonsWatched,
    };

    return this.watchedShowsSRepository.create(createWatchedShowCommand);
  }

  private async createShowCommandFromTmdbId(
    tmdbId: number,
  ): Promise<CreateShowCommand> {
    const showDetails = await this.tmdbApiAdapter.getShow({
      tmdbId: tmdbId,
    });
    let createShowCommand = new CreateShowCommand();
    createShowCommand = { ...createShowCommand, ...showDetails };
    return createShowCommand;
  }
}
