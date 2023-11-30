import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
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
import { ShowEntity } from '../../domain/entities/show.entity';

// TODO
@Controller('watchedshows')
export class WatchedShowsController {
  constructor(
    private authService: AuthService,
    private watchedShowsRepository: WatchedShowsRepository,
    private usersMapper: UsersMapper,
    @Inject('USER_REPOSITORY')
    private usersOrmRepository: Repository<UserOrmEntity>,
    @Inject('SHOW_REPOSITORY')
    private showsOrmRepository: Repository<ShowOrmEntity>,
    private showsRepository: ShowsRepository,
    private tmdbApiAdapter: TmdbApiAdapter,
    private showsMapper: ShowTrackingMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll() {
    return this.watchedShowsRepository.findAll();
  }

  @UseGuards(AuthGuard)
  @Get()
  async findUserWatchedShows(@Request() req) {
    const userId = req.user.sub;
    const userOrmEntity = await this.usersOrmRepository.findOne({
      where: {
        id: userId,
      },
    });
    const userEntity = this.usersMapper.toEntity(userOrmEntity);
    return this.watchedShowsRepository.findUserWatchedShows(userEntity);
  }

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

    const createWatchedShowCommand: CreateWatchedShowCommand = {
      user: userEntity,
      watchedSeasons: watchedShowData.numberOfSeasonsWatched,
      show: new ShowEntity(),
    };

    if (await this.showExistsInDatabase(watchedShowData.tmdbId)) {
      createWatchedShowCommand.show = await this.showsOrmRepository
        .findOne({
          where: {
            tmdbId: watchedShowData.tmdbId,
          },
        })
        .then((show) => this.showsMapper.toEntity(show));
    } else {
      const createShowCommand: CreateShowCommand =
        await this.createShowCommandFromTmdbId(watchedShowData.tmdbId);
      const showOrmEntity =
        await this.showsRepository.create(createShowCommand);
      createWatchedShowCommand.show = this.showsMapper.toEntity(showOrmEntity);
    }

    return this.watchedShowsRepository.create(createWatchedShowCommand);
  }

  private async showExistsInDatabase(tmdbId: number) {
    const show = await this.showsOrmRepository.findOne({
      where: {
        tmdbId: tmdbId,
      },
    });
    return show != null;
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
