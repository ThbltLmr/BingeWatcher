import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { WatchedShowsService } from './watchedShows.service';
import { ShowDataDto } from 'src/shows/dtos/ShowData.dto';

@Controller('watchedShows')
export class WatchedShowsController {
  constructor(
    private authService: AuthService,
    private watchedShowsService: WatchedShowsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('add')
  addWatchedShow(@Request() req, @Body() showData: ShowDataDto) {
    const userId = req.user.sub;
    const showtmdbId = showData.tmdbId;
    return this.watchedShowsService.addWatchedShow(userId, showtmdbId);
  }
}
