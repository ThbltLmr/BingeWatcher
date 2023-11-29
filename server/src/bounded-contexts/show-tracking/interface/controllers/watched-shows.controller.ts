import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../../shared-kernel/authentication/guards/auth.guard';
import { AuthService } from '../../../../shared-kernel/authentication/services/auth.service';
import { WatchedShowsRepository } from '../../infrastructure/database/watched-shows.repository';
import { WatchedShowDataDto } from '../dtos/watched-show-data.dto';

// TODO
@Controller('watchedshows')
export class WatchedShowsController {
  constructor(
    private authService: AuthService,
    private watchedShowsSRepository: WatchedShowsRepository,
  ) {}

  @UseGuards(AuthGuard)
  @Post('add')
  addWatchedShow(@Request() req, @Body() watchedShowData: WatchedShowDataDto) {
    const userId = req.user.sub;
    return this.watchedShowsSRepository.addWatchedShow(
      userId,
      watchedShowData.tmdbId,
      watchedShowData.numberOfSeasonsWatched,
    );
  }
}
