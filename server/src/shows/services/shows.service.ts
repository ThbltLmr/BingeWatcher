import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Show } from '../entities/show.entity';
import { ConfigService } from '@nestjs/config';
import { ShowDataDto } from '../dtos/ShowData.dto';

@Injectable()
export class ShowService {
  constructor(
    @Inject('SHOW_REPOSITORY')
    private showRepository: Repository<Show>,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<Show[]> {
    return this.showRepository.find();
  }

  async findOne(id: number): Promise<Show> {
    return this.showRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(showData: ShowDataDto): Promise<Show> {
    await this.checkIfShowExists(showData.tmdbId);
    const show = this.createShowEntity(showData);
    return this.showRepository.save(show);
  }

  async update(id: number, showData: ShowDataDto): Promise<Show> {
    const show = await this.findOne(id);
    this.updateShowEntity(showData, show);
    return this.showRepository.save(show);
  }

  async delete(id: number): Promise<any> {
    return this.showRepository.delete(id);
  }

  private async checkIfShowExists(tmdbId: number): Promise<void> {
    const existingShow = await this.showRepository.findOne({
      where: { tmdbId },
    });
    if (existingShow) {
      throw new Error('Show already exists');
    }
  }

  private createShowEntity(showData: ShowDataDto): Show {
    const show = new Show();
    this.updateShowEntity(showData, show);
    return show;
  }

  private updateShowEntity(showData: ShowDataDto, show: Show): Show {
    show.title = showData.title;
    show.description = showData.description;
    show.numberOfSeasons = showData.numberOfSeasons;
    show.posterURL =
      this.configService.get<string>('TMDB_API_IMAGE_URL') + showData.posterURL;
    show.tmdbId = showData.tmdbId;
    show.genres = showData.genres;
    return show;
  }
}
