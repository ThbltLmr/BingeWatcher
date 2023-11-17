import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { WatchedShowsService } from '../services/watchedShows.service';
import { WatchedShowDataDto } from '../dtos/WatchedShowData.dto';

@Controller('watchedshows')
export class WatchedShowsController {
  constructor(
    private authService: AuthService,
    private watchedShowsService: WatchedShowsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('add')
  addWatchedShow(@Request() req, @Body() watchedShowData: WatchedShowDataDto) {
    const userId = req.user.sub;
    return this.watchedShowsService.addWatchedShow(
      userId,
      watchedShowData.tmdbId,
      watchedShowData.numberOfSeasonsWatched,
    );
  }
}
