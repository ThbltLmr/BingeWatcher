import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../../../shared-kernel/authentication/guards/auth.guard';
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
import { GetUserWatchedShowsQuery } from '../../infrastructure/queries/get-user-watched-shows.query';
import { UpdateWatchedShowDto } from '../dtos/update-watched-show.dto';
import { GetWatchedShowQuery } from '../../infrastructure/queries/get-watched-show.query';
import { UpdateWatchedShowCommand } from '../../infrastructure/commands/update-watched-show.command';
import { DeleteWatchedShowCommand } from '../../infrastructure/commands/delete-watched-show.command';

@Controller('watchedshows')
export class WatchedShowsController {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersOrmRepository: Repository<UserOrmEntity>,
    @Inject('SHOW_REPOSITORY')
    private showsOrmRepository: Repository<ShowOrmEntity>,
    private watchedShowsRepository: WatchedShowsRepository,
    private showsRepository: ShowsRepository,
    private tmdbApiAdapter: TmdbApiAdapter,
    private showsMapper: ShowTrackingMapper,
    private usersMapper: UsersMapper,
  ) {}

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
    const query = new GetUserWatchedShowsQuery();
    query.user = userEntity;
    return this.watchedShowsRepository.findUserWatchedShows(query);
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

  @UseGuards(AuthGuard)
  @Post(':id')
  async updateWatchedShow(
    @Param() params: any,
    @Body() watchedShowData: UpdateWatchedShowDto,
  ) {
    const query = new GetWatchedShowQuery();
    query.id = params.id;
    const watchedShow = await this.watchedShowsRepository.findOne(query);
    watchedShow.seasonsWatched = watchedShowData.numberOfSeasonsWatched;
    const command = new UpdateWatchedShowCommand();
    command.watchedShow = watchedShow;
    return this.watchedShowsRepository.update({ watchedShow });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getWatchedShow(@Param() params: any) {
    const query = new GetWatchedShowQuery();
    query.id = params.id;
    const watchedShow = await this.watchedShowsRepository.findOne(query);
    return watchedShow;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteWatchedShow(@Param() params: any) {
    const command = new DeleteWatchedShowCommand();
    command.id = params.id;
    const watchedShow = await this.watchedShowsRepository.delete(command);
    return watchedShow;
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
