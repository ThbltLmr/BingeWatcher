import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../../../shared-kernel/authentication/guards/auth.guard';
import { ShowEntity } from '../../domain/entities/show.entity';
import { UsersRepository } from '../../infrastructure/database/users.repository';
import { ShowsRepository } from '../../infrastructure/database/shows.repository';
import { WatchedShowsRepository } from '../../infrastructure/database/watched-shows.repository';
import { TmdbApiAdapter } from '../../infrastructure/tmdb-api/shows.tmdbapi.adapter';
import { CreateShowCommand } from '../../infrastructure/commands/create-show.command';
import { CreateWatchedShowCommand } from '../../infrastructure/commands/create-watched-show.command';
import { UpdateWatchedShowCommand } from '../../infrastructure/commands/update-watched-show.command';
import { DeleteWatchedShowCommand } from '../../infrastructure/commands/delete-watched-show.command';
import { GetUserWatchedShowsQuery } from '../../infrastructure/queries/get-user-watched-shows.query';
import { GetWatchedShowQuery } from '../../infrastructure/queries/get-watched-show.query';
import { GetUserByIdQuery } from '../../infrastructure/queries/get-user-by-id.query';
import { GetShowByTmdbIdQuery } from '../../infrastructure/queries/get-show-by-tmdbid.query';
import { WatchedShowDataDto } from '../dtos/watched-show-data.dto';
import { UpdateWatchedShowDto } from '../dtos/update-watched-show.dto';

@Controller('watchedshows')
export class WatchedShowsController {
  constructor(
    private watchedShowsRepository: WatchedShowsRepository,
    private usersRepository: UsersRepository,
    private showsRepository: ShowsRepository,
    private tmdbApiAdapter: TmdbApiAdapter,
  ) {}

  // Used in manual testing to check all rows in table
  @Get('all')
  async findAll() {
    return this.watchedShowsRepository.findAll();
  }

  // Get a user's watched shows
  @UseGuards(AuthGuard)
  @Get()
  async findUserWatchedShows(@Request() req) {
    const userQuery = new GetUserByIdQuery();
    userQuery.id = req.user.sub;
    const userEntity = await this.usersRepository.findOne(userQuery);
    const watchedShowsQuery = new GetUserWatchedShowsQuery();
    watchedShowsQuery.user = userEntity;
    return this.watchedShowsRepository.findUserWatchedShows(watchedShowsQuery);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  async addWatchedShow(
    @Request() req,
    @Body() watchedShowData: WatchedShowDataDto,
  ) {
    const userQuery = new GetUserByIdQuery();
    userQuery.id = req.user.sub;
    const userEntity = await this.usersRepository.findOne(userQuery);

    const createWatchedShowCommand: CreateWatchedShowCommand = {
      user: userEntity,
      watchedSeasons: watchedShowData.numberOfSeasonsWatched,
      show: new ShowEntity(),
    };

    if (await this.showExistsInDatabase(watchedShowData.tmdbId)) {
      const showQuery = new GetShowByTmdbIdQuery();
      showQuery.tmdbId = watchedShowData.tmdbId;
      createWatchedShowCommand.show =
        await this.showsRepository.findOneByTmdbId(showQuery);
    } else {
      const createShowCommand: CreateShowCommand =
        await this.createShowCommandFromTmdbId(watchedShowData.tmdbId);
      const showEntity = await this.showsRepository.create(createShowCommand);
      createWatchedShowCommand.show = showEntity;
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
    const query = new GetShowByTmdbIdQuery();
    query.tmdbId = tmdbId;
    const show = await this.showsRepository.findOneByTmdbId(query);
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
