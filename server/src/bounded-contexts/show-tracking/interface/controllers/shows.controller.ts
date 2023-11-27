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

@Controller('shows')
export class ShowsController {
  constructor(
    readonly showsRepository: ShowsRepository,
    private readonly configService: ConfigService
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
    const command = new CreateShowCommand();
    command.title = showData.title;
    command.description = showData.description;
    command.posterUrl = new TmdbPosterUrl(
      this.configService.get<string>('TMDB_API_IMAGE_URL') + showData.posterUrl,
    );
    command.numberOfSeasons = showData.numberOfSeasons;
    command.tmdbId = showData.tmdbId;
    command.genres = showData.genres.map((genre) => {
      return new Genre(genre);
    });
    return this.showsRepository.create(command);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() showData: ShowDataDto) {
    return this.showsRepository.update(params.id, showData);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.showsRepository.delete(params.id);
  }
}
