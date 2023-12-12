import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ShowsRepository } from '../../infrastructure/database/shows.repository';
import { ShowDataDto } from '../dtos/show-data.dto';
import { GetShowById } from '../../infrastructure/queries/get-show-by-id.query';
import { CreateShowCommand } from '../../infrastructure/commands/create-show.command';
import { ConfigService } from '@nestjs/config';
import { TmdbPosterUrl } from '../../domain/value-objects/tmdb-poster-url.value-object';
import { Genre } from '../../domain/value-objects/genre.value-object';
import { UpdateShowCommand } from '../../infrastructure/commands/update-show.command';
import { DeleteShowCommand } from '../../infrastructure/commands/delete-show.command';

@Controller('shows')
export class ShowsController {
  constructor(
    readonly showsRepository: ShowsRepository,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async findAll() {
    return this.showsRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    const query = new GetShowById();
    query.id = params.id;
    return this.showsRepository.findOne(query);
  }

  @Post()
  create(@Body() showData: ShowDataDto) {
    let command = new CreateShowCommand();
    command.posterUrl = new TmdbPosterUrl(
      this.configService.get<string>('TMDB_API_IMAGE_URL') + showData.posterUrl,
    );
    command.genres = showData.genres.map((genre) => {
      return new Genre(genre);
    });
    command = { ...showData, ...command };
    return this.showsRepository.create(command);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() showData: ShowDataDto) {
    let command = new UpdateShowCommand();
    command.id = params.id;
    if (showData.posterUrl) {
      command.posterUrl = new TmdbPosterUrl(
        this.configService.get<string>('TMDB_API_IMAGE_URL') +
          showData.posterUrl,
      );
    }
    if (showData.genres) {
      command.genres = showData.genres.map((genre) => {
        return new Genre(genre);
      });
    }
    command = { ...showData, ...command };
    return this.showsRepository.update(command);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    const command = new DeleteShowCommand();
    command.id = params.id;
    return this.showsRepository.delete(command);
  }
}
